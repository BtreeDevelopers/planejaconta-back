import {
  ICreateUserDTO,
  ICreateUserWithTransactionDTO,
  IUserDTO,
} from "../dtos/UserDTO";

export default interface IUserRepository {
  create({ name, email, profilePath }: ICreateUserDTO): Promise<IUserDTO>;

  createWithTransaction({
    name,
    email,
    profilePath,
    session,
  }: ICreateUserWithTransactionDTO): Promise<IUserDTO>;

  isEmailAvailable(email: string): Promise<boolean>;
}
