import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserRepository from "@shared/infra/database/mongoose/repositories/userRepository/models/IUserRepository";
import ICredentialRepository from "@shared/infra/database/mongoose/repositories/credentialRepository/models/ICredentialRepository";
import mongoose from "mongoose";
import { ICreateUserServiceDTO } from "../dtos/User";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("CredentialRepository")
    private credentialRepository: ICredentialRepository
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserServiceDTO): Promise<void> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const user = await this.userRepository.createWithTransaction({
        name,
        email,
        session,
      });

      await this.credentialRepository.createWithTransaction({
        password,
        userId: user._id,
        session,
      });

      session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
      throw new AppError("Falha no registro do usuário.", 400);
    }
  }
}

export default CreateUserService;
