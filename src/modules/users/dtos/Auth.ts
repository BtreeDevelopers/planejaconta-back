export interface IAuthServiceDTO {
  email: string;
  password: string;
}

export interface IAuthUserDTO {
  token: string;
  userId: string;
  name: string;
}
