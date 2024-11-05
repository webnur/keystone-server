import { Request, Response } from "express";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { masterFilterableFields } from "./master.constant";
import { MastersService } from "./master.service";
import { IMasters } from "./master.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";

const createMasters = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await MastersService.createMasterData(data);
  sendResponse<IMasters>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Master data created successfully",
    data: result,
  });
});

const getAllMastersData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, masterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await MastersService.getAllMastersData(
    filters,
    paginationOptions
  );

  sendResponse<IMasters[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get all Master data fetched successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleMaster = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await MastersService.getSingleMaster(id);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).send({
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Master data not found!",
    });
  }

  sendResponse<IMasters>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get single Master data fetched successfully!",
    data: result,
  });
});

export const MastersController = {
  createMasters,
  getAllMastersData,
  getSingleMaster,
};
