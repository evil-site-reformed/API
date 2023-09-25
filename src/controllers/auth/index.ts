import { Router, Request, Response } from "express";
import { Prisma, PrismaClient, User } from '@prisma/client';
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { LoginUserRequestBody, RegisterUserRequestBody } from "../../schemas/index"


const db = new PrismaClient();

export async function registerUser(request: Request, response: Response) {
    if(!request.body) { response.status(400).json({ message: "No Body found." }) };

    const result = RegisterUserRequestBody.safeParse(request.body);
    if(result.success === false) {
        return response.status(400).json({ message: result.error.issues[0].message });
    }

    const inviteInDB = await db.invite.findFirst({
        where: {
            invite: request.body.invite
        }
    });


    if(!inviteInDB || inviteInDB.registrant !== null) { response.status(401).json({ message: "Invite is either Invalid or it's used." }) } else {
        const hashedPassword = await argon2.hash(request.body.password);
        try {
            const newUser = await db.user.create({
                data: {
                    username: request.body.username,
                    password: hashedPassword,
                    uuid: uuidv4()
                }
            });
            console.log(newUser);
            console.log(inviteInDB);
        } catch (e) {
            if(e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') { response.status(400).json({ message: "This user already exists." }) }
            }
        };

    };

}; 

export async function authorizeUser(request: Request, response: Response) {
    if(!request.body) { response.status(400).json({ message: "No Body found." }) };

    const result = LoginUserRequestBody.safeParse(request.body);

    if(result.success === false) {
        return response.status(400).json({ message: result.error.issues[0].message });
    };

    const data = result.data;

    const userFromDB = await db.user.findUnique({
        where: {
            username: data.username
        }
    });

    if(!userFromDB) {
        return response.status(404).json({ message: "User not found." })
    }

};
