
import express, { Router, Request, Response, NextFunction } from "express";
import * as authController  from "../../controllers/auth/index";

export const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.authorizeUser);