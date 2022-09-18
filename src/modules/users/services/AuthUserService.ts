import { inject, injectable } from "tsyringe";
import IUserRepository from "@shared/infra/database/mongoose/repositories/userRepository/models/IUserRepository";
import IGenerateJWTProvider from "@shared/providers/generateJWTProvider/models/IGenerateJWTProvider";
import { IAuthServiceDTO, IAuthUserDTO } from "../dtos/Auth";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import ICredentialRepository from "@shared/infra/database/mongoose/repositories/credentialRepository/models/ICredentialRepository";

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
  }
}

export default AuthUserService;
