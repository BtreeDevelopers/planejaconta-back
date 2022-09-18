import { container } from "tsyringe";
import GenerateJWTProvider from "./implementations/GenerateJWTProvider";
import IGenerateJWTProvider from "./models/IGenerateJWTProvider";

container.registerSingleton<IGenerateJWTProvider>(
  "GenerateJWTProvider",
  GenerateJWTProvider
);
