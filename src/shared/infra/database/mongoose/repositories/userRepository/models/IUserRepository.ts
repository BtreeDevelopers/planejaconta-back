import { IUserDTO } from "../dtos/UserDTO";

export interface ICreateUserDTO {
  name: string;
  email: string;
  profilePath?: string;
}

export default interface IUserRepository {
  create({ name, email, profilePath }: ICreateUserDTO): Promise<IUserDTO>;

  isEmailAvailable(email: string): Promise<boolean>;
}
