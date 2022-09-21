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
