import userRoutes from "@modules/users/infra/routes";
import { Router } from "express";

const routes = Router();

routes.use("/user", userRoutes);

routes.get("/health-check", (_request, response) =>
  response.status(200).json({ uptime: Math.floor(process.uptime()) })
);

export default routes;
