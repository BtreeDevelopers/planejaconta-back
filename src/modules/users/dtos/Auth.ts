export interface IAuthServiceDTO {
  token: string;
  userId: string;
}

export interface IAuthUserDTO {
  token_planeja: string;
  _id: string;
  nome: string;
  email: string;
  bauth_token: string;
  imagemUrl: string;
}
