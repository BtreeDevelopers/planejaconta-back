import { Router } from "express";

const routes = Router();

routes.get("/health-check", (_request, response) =>
  response.status(200).json({ uptime: Math.floor(process.uptime()) })
);

export default routes;
