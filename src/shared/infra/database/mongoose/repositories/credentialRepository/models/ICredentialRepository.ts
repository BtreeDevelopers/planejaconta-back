import {
  IActiveTokenDTO,
  ICreateCredentialDTO,
  ICreateCredentialWithTransactionDTO,
  ICredentialDTO,
  IUpdatePasswordDTO,
} from "../dtos/CredentialDTO";

export default interface ICredentialRepository {
  create({ userId, password }: ICreateCredentialDTO): Promise<ICredentialDTO>;

  createWithTransaction({
    userId,
    password,
    session,
  }: ICreateCredentialWithTransactionDTO): Promise<ICredentialDTO>;

  activeToken({
    userId,
    token,
    tokenExpiresIn,
  }: IActiveTokenDTO): Promise<void>;

  updatePassword({ token, password }: IUpdatePasswordDTO): Promise<void>;

  findByUserId(userId: string): Promise<ICredentialDTO | null>;

  findByToken(token: string): Promise<ICredentialDTO | null>;
}
