import express, { Request, Response } from "express";
import Account, { IAccount } from "../schema/account";
import MongoDB from "../mongoDB";
import { HydratedDocument } from "mongoose";

const route = express.Router();

interface SignUpRequestBody {
    username: string;
    password: string;
}

route.post("/signup", async (req: Request, res: Response) => {
    const { username, password }: SignUpRequestBody = req.body;

    try {
        await MongoDB.open();
        const findAccount: HydratedDocument<IAccount>[] = await Account.find({ username });
        if (findAccount.length > 0) {
            return res.status(409).send({ message: "Account already exits." });
        }

        const saveAccount: HydratedDocument<IAccount> = new Account({ username });
        await saveAccount.encryptPassword(password);

        const response = await saveAccount.save();
        return res.status(200).send({ _id: response._id });
    } catch (error) {
        console.log("debug server error >>>>>> " + error);
        return res.status(500).send(error);
    } finally {
        await MongoDB.close();
    }
});

export default route;
