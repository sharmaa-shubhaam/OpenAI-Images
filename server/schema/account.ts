import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

interface IAccountBase {
    username: string;
    password: string;
    createdAt: Date;
}

interface IAccountMethods {
    encryptPassword(password: string): Promise<void>;
    decryptPassword(password: string): Promise<boolean>;
}

export interface IAccount extends IAccountBase, IAccountMethods {}

const AccountSchema = new mongoose.Schema<IAccount>({
    username: { type: String, required: true, ref: "username" },
    password: { type: String, required: true, ref: "password" },
    createdAt: { type: Date, default: new Date() },
});

// encrypt password instace methods.
AccountSchema.methods.encryptPassword = async function (password: string) {
    if (!password) {
        throw new Error("Please provide password.");
    }

    try {
        const secureEncryptedPassword = await bcryptjs.hash(password, 10);
        this.password = secureEncryptedPassword;
    } catch (error) {
        throw new Error("Not able to encrypt password." + error);
    }
};

// decrypt the password and compare it.
AccountSchema.methods.decryptPassword = async function (hashPassword: string) {
    if (!hashPassword) {
        throw new Error("Please provide encrypted password.");
    }

    try {
        const compare = await bcryptjs.compare(hashPassword, this.password);
        if (!compare) throw new Error("Invalid credentials");

        return true;
    } catch (error) {
        throw new Error("Error while decrypting the password." + error);
    }
};

const Account = mongoose.models.account || mongoose.model<IAccount>("account", AccountSchema);

export default Account;
