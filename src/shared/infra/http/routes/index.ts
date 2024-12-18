import callRoutes from "@modules/calls/infra/routes";
import newsletterRoutes from "@modules/newsletter/infra/routes";
import operationRoutes from "@modules/operations/infra/routes";
import userRoutes from "@modules/users/infra/routes";
import { Router, json, response } from "express";
import SumOperationOperationService from "@modules/operations/services/SumOperationService";
import OperationController from "@modules/operations/infra/controllers/OperationController";
import { compare } from 'bcryptjs';
import { SENHASUPERSECRETA } from "@config/constants";

const routes = Router();

routes.use("/call", callRoutes);
routes.use("/user", userRoutes);
routes.use("/newsletter", newsletterRoutes);
routes.use("/operation", operationRoutes);

routes.get("/", (_request, response) =>
  response.status(200).json({ message: "Aplication is running!" })
);

routes.get("/health-check", (_request, response) =>
  response.status(200).json({ uptime: Math.floor(process.uptime()) })
);

// routes.get("/sum", async (_request, response) => {
//   const operationController = new OperationController();
//   await operationController.CronJob();
//   response.status(200).json({ message: "ablublu" });
// });

routes.post("/sum", async (_request, response) => {
  const { password } = _request.body;
  const passwordMatch = await compare(password, SENHASUPERSECRETA);
  if (!passwordMatch) {
    return response.status(403).json({message: "Usuário ou senha incorretos"});
  }

  const operationController = new OperationController();
  await operationController.CronJob();
  return response.status(200).json({ message: 'ablublu'});
});

export default routes;
