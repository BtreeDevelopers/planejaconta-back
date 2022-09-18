import { IUserDTO } from "../../userRepository/dtos/UserDTO";

export interface IOperationDTO {
  _id: string;
  userId: string | IUserDTO;
  operationType: number;
  name: string;
  classification: number;
  type: string;
  amount: number;
  operationAt: Date;
  dueAt: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateOperationDTO {
  userId: string | IUserDTO;
  operationType: number;
  name: string;
  classification: number;
  type: string;
  amount: number;
  operationAt: Date;
  dueAt: Date | undefined;
}

export interface IListOperationDTO {
  filter: any;
  sort: string;
  asc: 1 | -1;
}
