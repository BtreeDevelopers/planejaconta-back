import { inject, injectable } from "tsyringe";
import IUserRepository from "@shared/infra/database/mongoose/repositories/userRepository/models/IUserRepository";
import { IUserDTO } from "@shared/infra/database/mongoose/repositories/userRepository/dtos/UserDTO";

@injectable()
class FindUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(user_id: string): Promise<IUserDTO | null> {
    const user = await this.userRepository.findById(user_id);

    return user;
  }
}

export default FindUserService;
