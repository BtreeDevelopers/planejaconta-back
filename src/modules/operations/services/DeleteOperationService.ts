import { inject, injectable } from "tsyringe";
import IOperationRepository from "@shared/infra/database/mongoose/repositories/operationRepository/models/IOperationRepository";
import { IDeleteOperationServiceDTO } from "../dtos/Operation";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteOperationService {
  constructor(
    @inject("OperationRepository")
    private operationRepository: IOperationRepository
  ) {}

  async execute({ _id }: IDeleteOperationServiceDTO): Promise<void> {
    const operation = await this.operationRepository.delete({ _id });
    if (!operation) {
      throw new AppError("Operações não encontrada.", 404);
    }
  }
}

export default DeleteOperationService;
