import { model, Document, Schema } from "mongoose";
import { INewsletterDTO } from "../dtos/NewsletterDTO";

export type INewsletterDocument = INewsletterDTO & Document;

const NewsletterSchema = new Schema(
  {
    _id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

export default model<INewsletterDocument>(
  "Newsletter",
  NewsletterSchema,
  "Newsletter"
);
