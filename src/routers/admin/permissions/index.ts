
import express, { Router, Request, Response, NextFunction } from "express";
import * as permissionController from "../../../controllers/admin/permissions/index"

export const permissionsRouter = express.Router();

permissionsRouter.post("/add/:username", permissionController.addPermission);

permissionsRouter.delete("/remove/:username", permissionController.removePermission);