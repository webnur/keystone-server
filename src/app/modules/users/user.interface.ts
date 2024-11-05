import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "vendor" | "customer" | "admin" | "super_admin";
  isVerified: boolean;
  contactNumber?: string;
  address?: string;
  needsPasswordChange: boolean;
}

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<
    Pick<IUser, "email" | "password" | "role" | "needsPasswordChange">
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
};
