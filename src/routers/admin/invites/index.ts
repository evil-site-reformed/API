
import express, { Router, Request, Response, NextFunction, response } from "express";
import InviteController from "../../../controllers/admin/invites";

export const inviteRouter = express.Router();

inviteRouter.post("/", InviteController.generateInvite);
inviteRouter.get("/all", InviteController.getAllInvites);
inviteRouter.get("/:uuid", InviteController.getInviteByUUID);
inviteRouter.get("/user/:uuid", InviteController.getInviteByOwnerUUID);