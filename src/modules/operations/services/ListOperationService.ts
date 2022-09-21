import { inject, injectable } from "tsyringe";
import IOperationRepository from "@shared/infra/database/mongoose/repositories/operationRepository/models/IOperationRepository";
import { IListOperationServiceDTO } from "../dtos/Operation";
import { IOperationDTO } from "@shared/infra/database/mongoose/repositories/operationRepository/dtos/OperationDTO";
import AppError from "@shared/errors/AppError";
import { TYPE_FILTERS } from "../enums/TypeFilters";

@injectable()
class ListOperationService {
  constructor(
    @inject("OperationRepository")
    private operationRepository: IOperationRepository
  ) {}

  async execute({
    typeFilterRaw,
    valueFilterRaw,
    sortRaw,
    ascRaw,
    userId,
  }: IListOperationServiceDTO): Promise<IOperationDTO[]> {
    const typeFilter = typeFilterRaw?.toString();
    const valueFilter = valueFilterRaw?.toString();
    const sort = sortRaw?.toString();
    const asc = Number(ascRaw);

    let filter;

    switch (Number(typeFilter)) {
      case TYPE_FILTERS.DATE:
        const dateSplited = valueFilter?.split("-");

        if (!dateSplited) {
          throw new AppError(
            "'value_filter' must be a date iso (yyyy-mm-dd).",
            400
          );
        }

        const year = Number(dateSplited[0]);
        const month = Number(dateSplited[1]) - 1;
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month, 1);
        endDate.setMonth(startDate.getMonth() + 1);

        filter = { operationAt: { $gte: startDate, $lt: endDate }, userId };
        break;

      case TYPE_FILTERS.OPERATION_TYPE:
        const valueOperationType = Number(valueFilter);

        if (valueOperationType !== 0 && valueOperationType !== 1) {
          throw new AppError("valueFilter must be 0 or 1.", 400);
        }
        filter = { operationType: valueOperationType };

        break;
      case TYPE_FILTERS.CLASSIFICATION:
        const valueClassification = Number(valueFilter);

        if (valueClassification !== 0 && valueClassification !== 1) {
          throw new AppError("valueFilter must be 0 or 1.", 400);
        }

        filter = { classification: valueClassification };
        break;

      default:
        filter = { userId };
        break;
    }

    const operation = await this.operationRepository.list({
      filter,
      sort: sort === "dueDate" ? "dueDate" : "operationAt",
      asc: asc ? 1 : -1,
    });

    return operation;
  }
}

export default ListOperationService;
