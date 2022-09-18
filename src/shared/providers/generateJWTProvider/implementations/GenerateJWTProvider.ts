import IGenerateJWTProvider from "../models/IGenerateJWTProvider";
import { sign } from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "@config/constants";

export default class GenerateJWTProvider implements IGenerateJWTProvider {
  async generate(userId: string): Promise<string> {
    if (!JWT_PRIVATE_KEY) {
      throw new Error("JWT_PRIVATE_KEY não encontrado.");
    }

    const token = sign({}, JWT_PRIVATE_KEY, {
      subject: userId,
      expiresIn: "4h",
    });

    return token;
  }
}
