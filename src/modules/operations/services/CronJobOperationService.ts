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

    const year =
      new Date().getMonth() == 1
        ? new Date().getFullYear() - 1
        : new Date().getFullYear();
    const month = new Date().getMonth() == 1 ? 12 : new Date().getMonth() - 1;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month, 1);

    endDate.setMonth(startDate.getMonth() + 1);

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
    console.log(operation);

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
