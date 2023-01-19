import { inject, injectable } from "tsyringe";
import IOperationRepository from "@shared/infra/database/mongoose/repositories/operationRepository/models/IOperationRepository";
import { IHardDeleteOperationServiceDTO } from "../dtos/Operation";
import AppError from "@shared/errors/AppError";

@injectable()
class HardDeleteOperationService {
  constructor(
    @inject("OperationRepository")
    private operationRepository: IOperationRepository
  ) {}

  async execute({ userId }: IHardDeleteOperationServiceDTO): Promise<void> {
    const operation = await this.operationRepository.hardDelete({
      userId,
    });

    if (!operation) {
      throw new AppError("Operações do usuario não encontradas.", 404);
    }
  }
}

export default HardDeleteOperationService;
