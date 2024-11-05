import mongoose from "mongoose";
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { masterearchableFields } from "./master.constant";
import { IMasters, IMastersFilters } from "./master.interface";
import { Masters } from "./master.model";

const createMasterData = async (
  payload: IMasters
): Promise<IMasters | null> => {
  const result = await Masters.create(payload);
  return result;
};

const getAllMastersData = async (
  filters: IMastersFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IMasters[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: masterearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: "i",
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Masters.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Masters.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleMaster = async (_id: string): Promise<IMasters | null> => {
  // Convert the string _id to a Mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new Error("Invalid ObjectId"); // Optional: handle invalid ObjectId
  }

  const result = await Masters.findById(new mongoose.Types.ObjectId(_id));
  return result;
};

export const MastersService = {
  createMasterData,
  getAllMastersData,
  getSingleMaster,
};
