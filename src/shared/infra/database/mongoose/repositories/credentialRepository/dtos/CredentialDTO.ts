import { ClientSession } from "mongoose";
import { IUserDTO } from "../../userRepository/dtos/UserDTO";

export interface ICredentialDTO {
  _id: string;
  userId: string | IUserDTO;
  password: string;
  token: string;
  isTokenActive: boolean;
  tokenExpiresIn: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCredentialDTO {
  userId: string;
  password: string;
}

export interface ICreateCredentialWithTransactionDTO {
  userId: string;
  password: string;
  session: ClientSession;
}

export interface IActiveTokenDTO {
  userId: string;
  token: string;
  tokenExpiresIn: Date;
}

export interface IUpdatePasswordDTO {
  password: string;
  token: string;
}
