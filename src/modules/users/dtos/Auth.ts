export interface IAuthServiceDTO {
  email: string;
  password: string;
}

export interface IAuthUserDTO {
 
  token_planeja: string,
  _id: string,
  nome: string,
  email: string,
  bauth_token: string,
  imagemUrl: string
}
