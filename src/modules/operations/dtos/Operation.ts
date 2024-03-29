import { IUserDTO } from "@shared/infra/database/mongoose/repositories/userRepository/dtos/UserDTO";

export interface ICreateOperationServiceDTO {
  userId: string | IUserDTO;
  operationType: number;
  name: string;
  classification: number;
  type: string;
  amount: number;
  operationAt: Date;
  dueAt: Date | undefined;
}

export interface IListOperationServiceDTO {
  typeFilterRaw: any;
  valueFilterRaw: any;
  sortRaw: any;
  ascRaw: any;
  userId: string;
}

export interface ICronJobOperationServiceDTO {}

export interface IUpdateOperationServiceDTO {
  userId: string;
  operationId: string;
  operationType: number;
  name: string;
  classification: number;
  type: string;
  amount: number;
  operationAt: Date;
  dueAt: Date | undefined;
}

export interface IHardDeleteOperationServiceDTO {
  userId: string;
}

export interface IDeleteOperationServiceDTO {
  _id: string;
}
