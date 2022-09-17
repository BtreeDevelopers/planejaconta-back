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