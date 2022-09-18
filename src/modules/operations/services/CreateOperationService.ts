import { inject, injectable } from "tsyringe";
import IOperationRepository from "@shared/infra/database/mongoose/repositories/operationRepository/models/IOperationRepository";
import { ICreateOperationServiceDTO } from "../dtos/Operation";
import { IOperationDTO } from "@shared/infra/database/mongoose/repositories/operationRepository/dtos/OperationDTO";

@injectable()
class CreateOperationService {
  constructor(
    @inject("OperationRepository")
    private operationRepository: IOperationRepository
  ) {}

  async execute({
    userId,
    operationType,
    name,
    classification,
    type,
    amount,
    operationAt,
    dueAt,
  }: ICreateOperationServiceDTO): Promise<IOperationDTO> {
    const operation = await this.operationRepository.create({
      userId,
      operationType,
      name,
      classification,
      type,
      amount,
      operationAt,
      dueAt,
    });

    return operation;
  }
}

export default CreateOperationService;
