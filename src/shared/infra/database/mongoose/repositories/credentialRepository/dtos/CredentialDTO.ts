import { ClientSession } from "mongoose";
import { IUserDTO } from "../../userRepository/dtos/UserDTO";

export interface ICredentialDTO {
  _id: string;
  userId: string | IUserDTO;
  password: string;
  token: string;
  isTokenActive: boolean;
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
}

export interface IUpdatePasswordDTO {
  password: string;
  token: string;
}
