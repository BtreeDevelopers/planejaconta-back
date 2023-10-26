import { inject, injectable } from "tsyringe";
import { ICreateCallServiceDTO } from "../dtos/Call";
import ICallRepository from "@shared/infra/database/mongoose/repositories/callRepository/models/ICallRepository";
import { ICallDTO } from "@shared/infra/database/mongoose/repositories/callRepository/dtos/CallDTO";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateCallService {
  constructor(
    @inject("CallRepository")
    private callRepository: ICallRepository
  ) {}

  async execute({
    name,
    email,
    description,
  }: ICreateCallServiceDTO): Promise<ICallDTO> {
    if (!name || !email || !description) {
      throw new AppError(
        "Os campos <name>, <email> e <description> são obrigatórios.",
        400
      );
    }

    const call = await this.callRepository.create({
      name,
      email,
      description,
    });

    return call;
  }
}

export default CreateCallService;
