import { model, Document, Schema } from "mongoose";
import { IOperationDTO } from "../dtos/OperationDTO";

export type IOperationDocument = IOperationDTO & Document;

const OperationSchema = new Schema(
  {
    _id: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    operationType: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    classification: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    operationAt: {
      type: Date,
      required: true,
    },
    dueAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

export default model<IOperationDocument>(
  "Operation",
  OperationSchema,
  "Operation"
);
