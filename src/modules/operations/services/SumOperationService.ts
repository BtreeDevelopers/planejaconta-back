import { inject, injectable } from "tsyringe";
import IOperationRepository from "@shared/infra/database/mongoose/repositories/operationRepository/models/IOperationRepository";
import { ICronJobOperationServiceDTO } from "../dtos/Operation";
import { IOperationDTO } from "@shared/infra/database/mongoose/repositories/operationRepository/dtos/OperationDTO";

import { container } from "tsyringe";
import CreateOperationService from "./CreateOperationService";
import UserRepository from "@shared/infra/database/mongoose/repositories/userRepository/implementations/UserRepository";

@injectable()
class SumOperationOperationService {
  constructor(
    @inject("OperationRepository")
    private operationRepository: IOperationRepository
  ) {}

  async execute({}: ICronJobOperationServiceDTO): Promise<IOperationDTO[]> {
    const asc = 1;
    const startDate = new Date("Sat, 01 Jun 2023 00:00:00 GMT-3");
    const endDate = new Date("Sun, 30 Jun 2023 00:00:00 GMT-3");
    let filter = {
      operationAt: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    const operation = await this.operationRepository.aggregate({
      filter,
    });
    console.log(filter);
    console.log(operation);
    return operation;
  }
}

export default SumOperationOperationService;
