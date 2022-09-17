import {
  IActiveTokenDTO,
  ICreateCredentialDTO,
  ICredentialDTO,
  IUpdatePasswordDTO,
} from "../dtos/CredentialDTO";

export default interface ICredentialRepository {
  create({ userId, password }: ICreateCredentialDTO): Promise<ICredentialDTO>;

  activeToken({ userId, token }: IActiveTokenDTO): Promise<void>;

  updatePassword({ token, password }: IUpdatePasswordDTO): Promise<void>;
}
