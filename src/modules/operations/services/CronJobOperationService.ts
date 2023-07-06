import { inject, injectable } from "tsyringe";
import IOperationRepository from "@shared/infra/database/mongoose/repositories/operationRepository/models/IOperationRepository";
import { ICronJobOperationServiceDTO } from "../dtos/Operation";
import { IOperationDTO } from "@shared/infra/database/mongoose/repositories/operationRepository/dtos/OperationDTO";
import AppError from "@shared/errors/AppError";
import { TYPE_FILTERS } from "../enums/TypeFilters";
import { container } from "tsyringe";
import CreateOperationService from "./CreateOperationService";
@injectable()
class CronJobOperationService {
  constructor(
    @inject("OperationRepository")
    private operationRepository: IOperationRepository
  ) {}

  async execute({}: ICronJobOperationServiceDTO): Promise<IOperationDTO[]> {
    const sort = "dueDate";
    const asc = 1;

    let filter;

    // Obtém a data atual
    const hoje = new Date();

    // Obtém o primeiro dia do mês atual
    const primeiroDiaMesAtual = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      1
    );

    // Subtrai um dia para obter o último dia do mês anterior
    const ultimoDiaMesAnterior = new Date(primeiroDiaMesAtual.getTime() - 1);

    // Obtém o primeiro dia do mês anterior
    const primeiroDiaAnterior = new Date(
      ultimoDiaMesAnterior.getFullYear(),
      ultimoDiaMesAnterior.getMonth(),
      1
    );

    const startDate = primeiroDiaAnterior;
    const endDate = ultimoDiaMesAnterior;

    filter = {
      classification: 0,
      operationAt: { $gte: startDate, $lte: endDate },
    };

    const operation = await this.operationRepository.list({
      filter,
      sort: sort === "dueDate" ? "dueDate" : "operationAt",
      asc: asc ? 1 : -1,
    });
    const createOperationService = container.resolve(CreateOperationService);
    //console.log(operation);

    for await (const element of operation) {
      const dateOpAt = element.operationAt;
      dateOpAt.setMonth(element.operationAt.getMonth() + 1);
      const dateDueAt = element.dueAt;
      if (element.dueAt) {
        dateDueAt?.setMonth(element.dueAt.getMonth() + 1);
      }
      await createOperationService.execute({
        userId: element.userId,
        operationType: element.operationType,
        name: element.name,
        classification: element.classification,
        type: element.type,
        amount: element.amount,
        operationAt: dateOpAt,
        dueAt: dateDueAt,
      });
    }

    return operation;
  }
}

export default CronJobOperationService;
