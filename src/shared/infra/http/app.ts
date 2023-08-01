import "reflect-metadata";
import "express-async-errors";

import express from "express";
import cors from "cors";
import { errors } from "celebrate";
// var cron = require("node-cron");
const schedule = require("node-schedule");

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

schedule.scheduleJob("0 0 1 */1 *", () => {
  const operationController = new OperationController();
  operationController.CronJob();
  console.log("At 00:00 on day-of-month 1 in every month.");
});

module.exports = app;
