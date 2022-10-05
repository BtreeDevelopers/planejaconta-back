import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserRepository from "@shared/infra/database/mongoose/repositories/userRepository/models/IUserRepository";
import { IUpdateUserServiceDTO } from "../dtos/User";
import { IUserDTO } from "@shared/infra/database/mongoose/repositories/userRepository/dtos/UserDTO";

@injectable()
class UpdateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    userId,
    name,
    email,
  }: IUpdateUserServiceDTO): Promise<IUserDTO> {
    const user = await this.userRepository.update({
      _id: userId,
      name,
      email,
    });

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return user;
  }
}

export default UpdateUserService;
