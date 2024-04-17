import express, { Request, Response } from "express";
import OpenAI from "openai";
import MongoDB from "./mongoDB";
const route = express.Router();

route.get("/openAI", async (req: Request, res: Response) => {
   try {
      const openai = new OpenAI({
         apiKey:process.env.OPEN_AI_SECRET_KEY
      });
      
      await MongoDB.open();
      return res.status(200).send("send data.");
   } catch (error) {
      console.log(error);
      return res.status(500).send(error);
   } finally {
      await MongoDB.close();
   }
});

export default route;
