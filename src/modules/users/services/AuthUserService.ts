import { inject, injectable } from "tsyringe";
import IUserRepository from "@shared/infra/database/mongoose/repositories/userRepository/models/IUserRepository";
import IGenerateJWTProvider from "@shared/providers/generateJWTProvider/models/IGenerateJWTProvider";
import { IAuthServiceDTO, IAuthUserDTO } from "../dtos/Auth";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import ICredentialRepository from "@shared/infra/database/mongoose/repositories/credentialRepository/models/ICredentialRepository";
import { bauth } from "@shared/utils/bauth/bauth";

@injectable()
class AuthUserService {
  constructor(
    @inject("CredentialRepository")
    private credentialRepository: ICredentialRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("GenerateJWTProvider")
    private generateJWTProvider: IGenerateJWTProvider
  ) {}

  async execute({ email, password }: IAuthServiceDTO): Promise<IAuthUserDTO> {
    /*
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Falha na autenticação.", 400);
    }
    const credential = await this.credentialRepository.findByUserId(user._id);
    if (!credential) {
      throw new AppError("Falha na autenticação.", 400);
    }
    const passwordMatch = await compare(password, credential.password);
    if (!passwordMatch) {
      throw new AppError("Falha na autenticação.", 400);
    }
    const token = await this.generateJWTProvider
      .generate(user._id)
      .catch((_error) => {
        throw new AppError("Falha na autenticação.", 400);
      });

    return { token, userId: user._id, name: user.name };
    */

    /*const loginUser = z.object({
      zemail: string().email(),
      zsenha: string(),
    });

    const { zemail, zsenha } = loginUser.parse({ email, password });*/

    const responseLogin = await bauth.post("/login", {
      email: email,
      senha: password,
    });

    const { token, user } = await responseLogin.data;

    bauth.defaults.headers.common = {
      Authorization: `bearer ${token}`,
    };
    const responseTokenUser = await bauth.get("/user");

    const userFromToken = responseTokenUser.data;

    const token_planeja = await this.generateJWTProvider
      .generate(user._id)
      .catch((_error) => {
        throw new AppError("Falha na autenticação.", 400);
      });
    return { 
      token_planeja: token_planeja,
      bauth_token:token, 
      _id: user._id, 
      nome: user.nome,
      email:user.email,
      imagemUrl: user.imagemUrl,
   };
  }
}

export default AuthUserService;
