import { model, Document, Schema } from "mongoose";
import { IUserDTO } from "../dtos/UserDTO";

export type IUserDocument = IUserDTO & Document;

const UserSchema = new Schema(
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
      unique: true,
      required: true,
    },
    profilePath: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

export default model<IUserDocument>("User", UserSchema, "User");
