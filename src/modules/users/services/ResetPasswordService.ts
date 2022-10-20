import { inject, injectable } from "tsyringe";
import IUserRepository from "@shared/infra/database/mongoose/repositories/userRepository/models/IUserRepository";
import IMailjetEmailProvider from "@shared/providers/mailjetEmailProvider/models/IMailjetEmailProvider";
import EmailResetPassword from "@shared/templates/EmailResetPassword";
import crypto from "crypto";
import ICredentialRepository from "@shared/infra/database/mongoose/repositories/credentialRepository/models/ICredentialRepository";

@injectable()
class ResetPasswordService {
  constructor(
    @inject("CredentialRepository")
    private credentialRepository: ICredentialRepository,

    @inject("MailjetEmailProvider")
    private mailjetEmailProvider: IMailjetEmailProvider,

    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(email: string): Promise<void> {
    const token = crypto.randomBytes(20).toString("hex");

    const tokenExpiresIn = new Date();
    tokenExpiresIn.setMinutes(tokenExpiresIn.getMinutes() + 10);

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      await this.credentialRepository.activeToken({
        userId: user._id,
        token,
        tokenExpiresIn,
      });

      await this.mailjetEmailProvider.sendEmail({
        email,
        name: user.name,
        htmlPart: EmailResetPassword(user.name, token),
        subject: "Recuperação de Senha",
      });
    }
  }
}

export default ResetPasswordService;
