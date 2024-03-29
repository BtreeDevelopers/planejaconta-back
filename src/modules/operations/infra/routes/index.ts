import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import OperationController from "../controllers/OperationController";

const operationController = new OperationController();

const operationRoutes = Router();

operationRoutes.use(ensureAuthenticated);

operationRoutes.post("/", operationController.store);

operationRoutes.get("/", operationController.list);

operationRoutes.patch("/:operationId", operationController.update);

operationRoutes.delete("/:userId", operationController.hardDelete);

operationRoutes.delete("/delete/:_id", operationController.delete);

export default operationRoutes;
