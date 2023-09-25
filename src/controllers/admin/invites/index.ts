import { PermissionsEnum } from "../../../enums";
import { Router, Request, Response, NextFunction, response } from "express";
import { PrismaClient, User, Invite } from '@prisma/client';
import { v4 as uuidv4 } from "uuid";

const db = new PrismaClient();

export default class InviteController {
    request: Request;
    response: Response;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    static async generateInvite(request: Request, response: Response) { 
        try {
            const newKey = await db.invite.create({ 
                data: {
                    invite: uuidv4(),
                    owner: request.body.uuid,
                }
            })
            response.status(200).json({ message: "Succesfully Generated an Invite Key", data: newKey })
        } catch (e) {
            response.status(500).send("Server Error");
            console.log(e);
        }
    }

    static async getAllInvites(request: Request, response: Response) {
        try {
            const allKeys = await db.invite.findMany();

            response.status(200).json({ message: `Total Number of keys are ${allKeys.length}`, data: allKeys })
        } catch (e) {
            response.status(500).json({ msg: "Server Error" })
            console.log(e);
        }
    }

    static async getInviteByUUID(request: Request, response: Response) {
        try {
            const invite = await db.invite.findUnique({
                where: {
                    invite: request.params.uuid
                }
            });
            if(invite) { response.status(200).json({ message: `Invite Found`, data: invite }) };

            if(invite === null) { response.status(404).json({ message: `Invite not Found`, data: {} }) };
        } catch (e) {
            response.status(500).json({ msg: "Server Error" });
            console.log(e);
        }
    }

    static async getInviteByOwnerUUID(request: Request, response: Response) {
        try {
            const invites = await db.invite.findMany({
                where: {
                    owner: request.params.uuid
                }
            })
            if(invites) { response.status(200).json({ message: `Invite Found`, data: invites }) };

            if(invites === null) { response.status(404).json({ message: `Invite not Found`, data: {} }) };
        } catch (e) {
            response.status(500).json({ msg: "Server Error" });
            console.log(e);
        }
    }
}