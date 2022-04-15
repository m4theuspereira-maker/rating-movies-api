import { USER_ROLES } from "@/domain/user/user";

export const VALID_USER = {
  name: "any name",
  email: "any_email@mail.com",
  password: "any_hashed_password",
  role: USER_ROLES.USER,
  isActive: true,
  createdAt: new Date()
};

export const VALID_USERS = [VALID_USER];
