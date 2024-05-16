"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiScretKey = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () : Promise<string> => {

    const user = await currentUser();

    if(!user) throw new Error("User is not authenticated")
    if(!apiKey) throw new Error("No apikey found")
    if (!apiScretKey) throw new Error("No apiScretKey found")
    
    const client = new StreamClient(apiKey, apiScretKey)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, exp, issued)
    
    if(!token) throw new Error("No token provided")

    return token;
}