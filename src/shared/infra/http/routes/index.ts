import callRoutes from "@modules/calls/infra/routes";
import operationRoutes from "@modules/operations/infra/routes";
import userRoutes from "@modules/users/infra/routes";
import { Router, json, response } from "express";
import SumOperationOperationService from "@modules/operations/services/SumOperationService";
import OperationController from "@modules/operations/infra/controllers/OperationController";

const routes = Router();

routes.use("/call", callRoutes);
routes.use("/user", userRoutes);
routes.use("/operation", operationRoutes);

routes.get("/", (_request, response) =>
  response.status(200).json({ message: "Aplication is running!" })
);

routes.get("/health-check", (_request, response) =>
  response.status(200).json({ uptime: Math.floor(process.uptime()) })
);

routes.get("/sum", async (_request, response) => {
  const operationController = new OperationController();
  await operationController.CronJob();
  response.status(200).json({ message: "ablublu" });
});

export default routes;
