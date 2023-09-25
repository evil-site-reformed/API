import { PermissionsEnum } from "../../../enums";
import { Router, Request, Response } from "express";
import { PrismaClient, User } from '@prisma/client';
const db = new PrismaClient();

export async function addPermission(req: Request, res: Response) {
    const user = await db.user.findUnique({
        where: {
            username: req.params.username
        },
        select: {
            permissions: true
        }
    });

    var userFlags: number = user.permissions;

    if(!req.body) { res.status(404).json({ message: "no body found" }); };

    const requestedPermission = req.body.permission;
    
    const permissionValue = PermissionsEnum[requestedPermission];

    userFlags |= Number(permissionValue);
    try {
        await db.user.update({
            data: {
                permissions: userFlags
            },
            where: {
                username: req.params.username
            }
        });

        res.status(200).json({
            message: "Succesfull."
        })
    } catch (error) {
        res.status(403).json({
            message: "No."
        })
    }
};

export async function removePermission(req: Request, res: Response) {
    if(!req.body) { res.status(404).json({ message: "no body found" }); };

    const user = await db.user.findUnique({
        where: {
            username: req.params.username
        },
        select: {
            permissions: true
        }
    });

    var userFlags: number = user.permissions;

    console.log(`Before Update: ${userFlags}`);

    const requestedPermission = req.body.permission;

    const permissionValue = PermissionsEnum[requestedPermission];

    userFlags &= ~Number(permissionValue);

    console.log(`After Update: ${userFlags}`);
    try {
        await db.user.update({
            data: {
                permissions: userFlags
            },
            where: {
                username: req.params.username
            }
        });

        res.status(200).json({
            message: "Succesfull."
        })
    } catch (error) {
        res.status(403).json({
            message: "No."
        })
    }
   
};


