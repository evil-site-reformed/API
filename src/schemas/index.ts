import { z } from "zod";


interface User {
    username: string,
    display_name: string,
    creationTime: string,
    password: string,
    banner_url: string,
    avatar_url: string,
    permissions: number
}

interface Invite {
    invite: string,
    owner: string,
    registrant: string,
}


export const RegisterUserRequestBody = z.object({
    invite: z.string().min(36),
    username: z.string().min(1),
    password: z.string().min(8)
 });
 
 export const LoginUserRequestBody = z.object({
    username: z.string().min(1),
    password: z.string().min(8)
 });