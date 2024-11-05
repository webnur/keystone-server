import { Schema, model } from "mongoose";
import { IMasters, IMastersModel } from "./master.interface";

const mastersSchema = new Schema<IMasters, IMastersModel>({
  title: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  degreeType: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  studyMode: {
    type: String,
    required: true,
  },
  locationType: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  applicationTime: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  recommended: {
    type: Boolean,
    default: false,
  },
});

export const Masters = model<IMasters, IMastersModel>("Masters", mastersSchema);
