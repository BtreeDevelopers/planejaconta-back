import { container } from "tsyringe";
import CredentialRepository from "./implementations/CredentialRepository";
import ICredentialRepository from "./models/ICredentialRepository";

container.registerSingleton<ICredentialRepository>(
  "CredentialRepository",
  CredentialRepository
);
