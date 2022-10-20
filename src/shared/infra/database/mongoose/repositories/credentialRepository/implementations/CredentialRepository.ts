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

  async activeToken({
    userId,
    token,
    tokenExpiresIn,
  }: IActiveTokenDTO): Promise<void> {
    await Credential.findOneAndUpdate(
      { userId },
      { token, isTokenActive: true, tokenExpiresIn }
    );
  }

  async updatePassword({ token, password }: IUpdatePasswordDTO): Promise<void> {
    await Credential.findOneAndUpdate(
      { token },
      { password, isTokenActive: false }
    );
  }

  async findByUserId(userId: string): Promise<ICredentialDTO | null> {
    const credential = await Credential.findOne({ userId }).select("password");

    return credential;
  }

  async findByToken(token: string): Promise<ICredentialDTO | null> {
    const credential = await Credential.findOne({
      token,
      isTokenActive: true,
    }).select("password tokenExpiresIn");

    return credential;
  }
}
