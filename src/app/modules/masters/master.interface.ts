import { Model } from "mongoose";

export interface IMasters {
  title: string;
  institution: string;
  country: string;
  degreeType: string;
  subject: string;
  location: string;
  duration: string;
  studyMode: string;
  locationType: string;
  language: string;
  applicationTime: string;
  applicationDeadline: string;
  description: string;
  imageUrl: string;
  logo: string;
  recommended: boolean;
}

export type IMastersModel = Model<IMasters, Record<string, unknown>>;

export type IMastersFilters = {
  searchTerm?: string;
  title?: string;
  location?: string;
  institution?: string;
  degreeType?: string;
  country?: string;
  subject?: string;
  duration?: string;
  description?: string;
  studyMode?: string;
  locationType?: string;
};
