import UUID from "@shared/utils/uuid";
import {
  IActiveTokenDTO,
  ICreateCredentialDTO,
  ICreateCredentialWithTransactionDTO,
  ICredentialDTO,
  IUpdatePasswordDTO,
} from "../dtos/CredentialDTO";
import ICredentialRepository from "../models/ICredentialRepository";
import Credential from "../schemas/Credential";

export default class CredentialRepository implements ICredentialRepository {
  async create({
    userId,
    password,
  }: ICreateCredentialDTO): Promise<ICredentialDTO> {
    const credential = await Credential.create({
      _id: new UUID().getV4(),
      userId,
      password,
    });

    return credential;
  }

  async createWithTransaction({
    userId,
    password,
    session,
  }: ICreateCredentialWithTransactionDTO): Promise<ICredentialDTO> {
    const credential = await Credential.create(
      [
        {
          _id: new UUID().getV4(),
          userId,
          password,
        },
      ],
      { session }
    );

    return credential[0];
  }

  async activeToken({ userId, token }: IActiveTokenDTO): Promise<void> {
    await Credential.findOneAndUpdate(
      { userId },
      { token, isTokenActive: true }
    );
  }

  async updatePassword({ token, password }: IUpdatePasswordDTO): Promise<void> {
    await Credential.findOneAndUpdate(
      { token },
      { password, isTokenActive: false }
    );
  }
}
