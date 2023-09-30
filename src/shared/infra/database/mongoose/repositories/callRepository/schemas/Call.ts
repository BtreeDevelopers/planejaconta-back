import { model, Document, Schema } from "mongoose";
import { ICallDTO } from "../dtos/CallDTO";

export type ICallDocument = ICallDTO & Document;

const CallSchema = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

export default model<ICallDocument>("Call", CallSchema, "Call");
