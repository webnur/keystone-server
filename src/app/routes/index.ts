import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { MasterRoutes } from "../modules/masters/master.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/users",
    module: UserRoutes,
  },
  {
    path: "/masters",
    module: MasterRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.module));
export default router;
