import { ICreateUserDTO, IUserDTO } from "../dtos/UserDTO";

export default interface IUserRepository {
  create({ name, email, profilePath }: ICreateUserDTO): Promise<IUserDTO>;

  isEmailAvailable(email: string): Promise<boolean>;
}
