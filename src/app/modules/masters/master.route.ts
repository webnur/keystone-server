import express from "express";

import { MastersController } from "./master.controller";
const router = express.Router();

router.post("/create", MastersController.createMasters);
router.get("/", MastersController.getAllMastersData);
router.get("/:id", MastersController.getSingleMaster);

export const MasterRoutes = router;
