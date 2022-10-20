import { model, Document, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import { ICredentialDTO } from "../dtos/CredentialDTO";

export type ICredentialDocument = ICredentialDTO & Document;

const CredentialSchema = new Schema(
  {
    _id: {
      type: String,
    },
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    token: {
      type: String,
    },
    isTokenActive: {
      type: Boolean,
      default: false,
    },
    tokenExpiresIn: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

CredentialSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.password, 10);
  this.password = hash;
  next();
});

export default model<ICredentialDocument>(
  "Credential",
  CredentialSchema,
  "Credential"
);
