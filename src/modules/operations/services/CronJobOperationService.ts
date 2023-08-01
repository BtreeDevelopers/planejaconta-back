import { inject, injectable } from "tsyringe";
import IOperationRepository from "@shared/infra/database/mongoose/repositories/operationRepository/models/IOperationRepository";
import { ICronJobOperationServiceDTO } from "../dtos/Operation";
import {
  ICreateOperation2DTO,
  IOperationDTO,
} from "@shared/infra/database/mongoose/repositories/operationRepository/dtos/OperationDTO";
import AppError from "@shared/errors/AppError";
import { TYPE_FILTERS } from "../enums/TypeFilters";
import { container } from "tsyringe";
import CreateOperationService from "./CreateOperationService";
import Operation from "@shared/infra/database/mongoose/repositories/operationRepository/schemas/Operation";
import UUID from "@shared/utils/uuid";
import OperationRepository from "@shared/infra/database/mongoose/repositories/operationRepository/implementations/OperationRepository";
@injectable()
class CronJobOperationService {
  constructor(
    @inject("OperationRepository")
    private operationRepository: IOperationRepository
  ) {}

  async execute({}: ICronJobOperationServiceDTO): Promise<IOperationDTO[]> {
    try {
      const sort = "dueDate";
      const asc = 1;

      let filter;

      // Obtém a data atual
      const hoje = new Date(new Date().getTime());
      //console.log(hoje);

      // Obtém o primeiro dia do mês atual
      const primeiroDiaMesAtual = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        1
      );
      let tzoffset = new Date().getTimezoneOffset() * 60000;
      const ultimoDiaMesAnterior = new Date(
        primeiroDiaMesAtual.getTime() - tzoffset
      );

      // Obtém o primeiro dia do mês anterior
      const primeiroDiaAnterior = new Date(
        ultimoDiaMesAnterior.getFullYear(),
        ultimoDiaMesAnterior.getMonth(),
        1
      );
      //offset in milliseconds

      var utc3 = new Date(
        primeiroDiaAnterior.getTime() - tzoffset
      ).toISOString();

      const startDate = new Date(utc3);
      const endDate = ultimoDiaMesAnterior;

      //console.log(startDate, endDate);

      filter = {
        classification: 0,
        operationAt: { $gte: startDate, $lt: endDate },
      };

      const operation = await this.operationRepository.list({
        filter,
        sort: sort === "dueDate" ? "dueDate" : "operationAt",
        asc: asc ? 1 : -1,
      });
      const createOperationService = container.resolve(CreateOperationService);
      //console.log(operation);

      // CronJob - Realizando a transferencia para o proximo mes das contas
      for await (const element of operation) {
        //console.log(">>>>>>>>");
        let auxOperationAt = element.operationAt;
        //console.log({ original: auxOperationAt });

        let dateOpAt = new Date(
          auxOperationAt.getUTCFullYear(),
          auxOperationAt.getUTCMonth() + 1,
          auxOperationAt.getUTCDate()
        );
        //console.log({ dateOpAt });

        let newdateOpAt = new Date(dateOpAt.getTime() - tzoffset);
        //console.log({ newdateOpAt });
        let dateDueAt = element.dueAt;
        if (element.dueAt) {
          dateDueAt?.setMonth(element.dueAt.getMonth() + 1);
        }

        //console.log({ newdateOpAt, dateOpAt, original: element.operationAt });
        await createOperationService.execute({
          userId: element.userId,
          operationType: element.operationType,
          name: element.name,
          classification: element.classification,
          type: element.type,
          amount: element.amount,
          operationAt: newdateOpAt,
          dueAt: dateDueAt,
        });
      }

      const listUser = await Operation.find()
        .sort({ userId: 1 })
        .distinct("userId");

      const operations = await Operation.aggregate([
        {
          $match: {
            $and: [
              { userId: { $in: listUser } },
              {
                operationAt: {
                  $gte: startDate,
                  $lt: endDate,
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: "$userId",
            totalMesPassado: {
              $sum: {
                $cond: [
                  { $eq: ["$operationType", 1] },
                  "$amount",
                  { $multiply: ["$amount", -1] },
                ],
              },
            },
          },
        },
      ]);

      //const createOperationService = container.resolve(CreateOperationService);
      const opps = operations.map((el) => {
        const uID = el._id;
        el._id = new UUID().getV4();
        const dateOpAt = new Date();
        let valorABS = Math.abs(el.totalMesPassado);
        el.userId = uID;
        el.operationType = el.totalMesPassado > 0 ? 1 : 0;
        el.name = "Saldo Mês Anterior";
        el.classification = 1;
        el.type = "Outro(s)";
        el.amount = valorABS;
        el.operationAt = dateOpAt;
        el.dueAt = undefined;
        return el;
      });

      await container
        .resolve(OperationRepository)
        .createMany(opps as unknown as ICreateOperation2DTO[]);

      return operation;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default CronJobOperationService;
