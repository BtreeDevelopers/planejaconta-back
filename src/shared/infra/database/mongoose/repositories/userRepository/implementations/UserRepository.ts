import UUID from "@shared/utils/uuid";
import {
  ICreateUserDTO,
  ICreateUserWithTransactionDTO,
  IUserDTO,
} from "../dtos/UserDTO";
import IUserRepository from "../models/IUserRepository";
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

  async createWithTransaction({
    name,
    email,
    profilePath,
    session,
  }: ICreateUserWithTransactionDTO): Promise<IUserDTO> {
    const user = await User.create(
      [
        {
          _id: new UUID().getV4(),
          name,
          email,
          profilePath,
        },
      ],
      { session }
    );

    return user[0];
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await User.findOne({ email });

    return !user;
  }

  async findById(_id: string): Promise<IUserDTO | null> {
    const user = await User.findById(_id);

    return user;
  }

  async findByEmail(email: string): Promise<IUserDTO | null> {
    const user = await User.findOne({ email });

    return user;
  }
}
