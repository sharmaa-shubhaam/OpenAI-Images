import express, { Request, Response } from "express";
import Account, { IAccount } from "../schema/account";
import MongoDB from "../mongoDB";
import { HydratedDocument } from "mongoose";

const route = express.Router();

interface SignInRequestBody {
    username: string;
    password: string;
}

route.post("/sign-in", async (req: Request, res: Response) => {
    const { username, password }: SignInRequestBody = req.body;
    if (!username && !password) {
        throw new Error("Provide request body");
    }

    try {
        await MongoDB.open();

        const findAccount: HydratedDocument<IAccount>[] = await Account.find({ username });
        if (findAccount.length === 0)
            return res.status(400).send({ message: "No username found." });

        const verify_password = await findAccount[0].decryptPassword(password);
        if (!verify_password) return res.status(400).send({ message: "Invalid credentials." });

        return res.status(200).send({ _id: findAccount[0]._id });
    } catch (error: any) {
        console.log("Debug server error (sign-in.ts): " + error);
        return res.status(500).send(error);
    } finally {
        await MongoDB.close();
    }
});

export default route;
