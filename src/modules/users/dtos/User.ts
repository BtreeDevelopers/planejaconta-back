export interface ICreateUserServiceDTO {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUserServiceDTO {
  userId: string;
  name: string;
  email: string;
}
