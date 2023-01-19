import "reflect-metadata";
import "express-async-errors";

import express from "express";
import cors from "cors";
import { errors } from "celebrate";
var cron = require("node-cron");

import "@shared/container";
import "@shared/infra/database/mongoose";

import HandleError from "@shared/errors/HandleError";
import routes from "./routes";
import OperationController from "@modules/operations/infra/controllers/OperationController";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(HandleError.handleError);

cron.schedule("0 1 2 */1 *", () => {
  const operationController = new OperationController();
  operationController.CronJob();
  console.log("At 01:00 on day-of-month 2 in every month.");
});

module.exports = app;
