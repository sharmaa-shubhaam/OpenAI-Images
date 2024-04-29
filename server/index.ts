// Loading the Constant Variable First....
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Importing the other files.
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import openAi from "./api/open-ai";
import signUp from "./api/sign-up";
import signIn from "./api/sign-in";

// Constant Variables.
const port = process.env.PORT;
const whitelist = ["http://localhost:3000"];

// Defining the CORS Config.
const config: {
    credentials: boolean;
    optionsSuccessStatus: number;
    origin: (requestOrigin: any, callback: any) => void;
} = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: (requestOrigin, callback) => {
        if (whitelist.indexOf(requestOrigin) !== -1 || !requestOrigin) {
            callback(null, true); // Enable CORS.
        } else {
            callback(new Error("Not allowed by CORS."), false); // Disable CORS, throw Error.
        }
    },
};

const app = express();

// using the middleware of app, use everytime.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(config));
app.use(signUp);
app.use(signIn);
app.use(openAi);

// Connecting with the server.
app.listen(port, () => console.log(`server running at http://localhost:${port}`));
