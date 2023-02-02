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
    let sort = sortRaw?.toString();
    const asc = Number(ascRaw);

    let filterGasto;
    let filterGanho;
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
    const endDate = new Date(year, month + 1, 0);

    let sort_types = ["name", "amount", "operationAt", "dueAt"];
    if (!sort_types.includes(sort)) {
      sort = "name";
    }

    if (sort === "amount") {
      filterGasto = {
        operationType: 0,
        operationAt: { $gte: startDate, $lt: endDate },
        userId,
      };
      filterGanho = {
        operationType: 1,
        operationAt: { $gte: startDate, $lt: endDate },
        userId,
      };
      const operationGasto = await this.operationRepository.list({
        filter: filterGasto,
        sort,
        asc: asc === 1 ? -1 : +1,
      });
      const operationGanho = await this.operationRepository.list({
        filter: filterGanho,
        sort,
        asc: asc === 1 ? 1 : -1,
      });
      let operation;
      if (asc === 1) {
        operation = operationGasto.concat(operationGanho);
      } else {
        operation = operationGanho.concat(operationGasto);
      }

      return operation;
    }

    const filter = {
      operationAt: { $gte: startDate, $lt: endDate },
      userId,
    };

    const operation = await this.operationRepository.list({
      filter: filter,
      sort,
      asc: asc === 1 ? 1 : -1,
    });
    return operation;
  }
}

export default ListOperationService;
