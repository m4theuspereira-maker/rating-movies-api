import { User } from "@/domain/user/user";
import { Types, Document, Schema, model } from "mongoose";

export interface IModelUser extends Document<User> {}

const userSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
    required: false
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  role: {
    type: String,
    required: true
  }
});

export const UserModel = model<IModelUser>("user", userSchema);
