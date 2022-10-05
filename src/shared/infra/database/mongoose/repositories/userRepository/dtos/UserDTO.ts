import { ClientSession } from "mongoose";

export interface IUserDTO {
  _id: string;
  name: string;
  email: string;
  profilePath?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserDTO {
  name: string;
  email: string;
  profilePath?: string;
}

export interface IUpdateUserDTO {
  _id: string;
  name: string;
  email: string;
}

export interface ICreateUserWithTransactionDTO {
  name: string;
  email: string;
  profilePath?: string;
  session: ClientSession;
}
