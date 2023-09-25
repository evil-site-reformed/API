import dotenv from "dotenv";
import express, { Application, Request, Router, Response, NextFunction } from "express";
import { EnvError, dbError } from "./util/error";
import { userRouter } from "./routers/users";
import { permissionsRouter } from "./routers/admin/permissions";
import bodyParser from 'body-parser';
import { authRouter } from "./routers/auth";
import Logger from "./util/logger";
import { PrismaClient } from '@prisma/client'
import { inviteRouter } from "./routers/admin/invites";

const db = new PrismaClient()



class App {
    private _app: Application

    public constructor() {
        this._app = express()

    }

    public async start() {
        dotenv.config();

        const port = process.env.PORT;
        const host = process.env.HOST;

        if(!host || !port) throw new EnvError("Failed to read enviroment table.");

        this._app.use(bodyParser.json());
        this._app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
        );

        this._app.use("/user", userRouter);
        this._app.use("/auth", authRouter); 


        this._app.use("/admin/permissions", permissionsRouter);
        this._app.use("/admin/invite", inviteRouter);
        this._app.get("/", (request: Request, response: Response, next: NextFunction) => {
            response.status(200).json({ message: "Welcome to https://evil.site" })
        });

        try {
            await db.$connect();
            Logger.info(`Succesfully connected to database.`);
        } catch (e) {
            throw new dbError("Can't Connect to database.");
        }

        this._app.listen(port, () => {

            Logger.info(`Succesfully Bount to port ${port} -- http://${host}:${port}!`);
            Logger.info(`Succesfully loaded 44 Routes`);
        });

        
    }
}

export default App;
