import { inject, injectable } from "tsyringe";
import ICredentialRepository from "@shared/infra/database/mongoose/repositories/credentialRepository/models/ICredentialRepository";
import { IRegisterPasswordDTO } from "../dtos/RegisterPassword";
import AppError from "@shared/errors/AppError";
import bcryptjs from "bcryptjs";

@injectable()
class RegisterPasswordService {
  constructor(
    @inject("CredentialRepository")
    private credentialRepository: ICredentialRepository
  ) {}

  async execute({ token, password }: IRegisterPasswordDTO): Promise<void> {
    const credential = await this.credentialRepository.findByToken(token);

    if (!credential) {
      console.log(`Token (${token}) inativo ou não econtrado na base.`);
      throw new AppError(
        "Falha na recuperação da senha. Contate o suporte.",
        400
      );
    }

    const dateNow = new Date();
    if (dateNow > credential.tokenExpiresIn) {
      console.log(`Token (${token}) expirado.`);
      throw new AppError(
        "Falha na recuperação da senha. Contate o suporte.",
        400
      );
    }

    const hash = await bcryptjs.hash(password, 10);
    await this.credentialRepository.updatePassword({ token, password: hash });
  }
}

export default RegisterPasswordService;
