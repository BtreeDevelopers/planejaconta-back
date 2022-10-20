import RegisterPasswordService from "@modules/users/services/RegisterPasswordService";
import ResetPasswordService from "@modules/users/services/ResetPasswordService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class PasswordController {
  public async reset(request: Request, response: Response) {
    const { email } = request.params;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute(email);

    return response.status(200).json({
      message: "Solicitação de recuperação de senha feita com sucesso.",
    });
  }

  public async register(request: Request, response: Response) {
    const { token } = request.params;
    const { password } = request.body;

    const registerPasswordService = container.resolve(RegisterPasswordService);

    await registerPasswordService.execute({ token, password });

    return response
      .status(200)
      .json({ message: "Nova senha salva com sucesso." });
  }
}

export default PasswordController;
