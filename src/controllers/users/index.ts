import { Router, Request, Response } from "express";
import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

export async function getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    
    res.json({ message: "success", data: users })
};
