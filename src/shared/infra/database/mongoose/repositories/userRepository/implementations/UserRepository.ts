import UUID from "@shared/utils/uuid";
import { IUserDTO } from "../dtos/UserDTO";
import IUserRepository, { ICreateUserDTO } from "../models/IUserRepository";
import User from "../schemas/User";

export default class UserRepository implements IUserRepository {
  async create({
    name,
    email,
    profilePath,
  }: ICreateUserDTO): Promise<IUserDTO> {
    const user = await User.create({
      _id: new UUID().getV4(),
      name,
      email,
      profilePath,
    });

    return user;
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await User.findOne({ email });

    return !user;
  }
}
