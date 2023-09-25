
import express, { Router, Request, Response, NextFunction } from "express";
import * as UserController from "../../controllers/users/index";

export const userRouter = express.Router();

userRouter.get("/all", UserController.getUsers);

