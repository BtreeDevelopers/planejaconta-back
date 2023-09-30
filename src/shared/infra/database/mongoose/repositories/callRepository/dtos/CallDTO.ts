export interface ICallDTO {
  _id: string;
  name: string;
  email: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCallDTO {
  name: string;
  email: string;
  description: string;
}
