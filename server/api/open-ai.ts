import express, { Request, Response } from "express";
import OpenAI from "openai";
import Picture, { IPicture } from "../schema/picture";
import { HydratedDocument } from "mongoose";
import MongoDB from "./../mongoDB";

interface OpenAiRequestBody {
    _id: string;
    description: string;
    size: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792" | null | undefined;
}

const route = express.Router();
const configration = {
    apiKey: process.env.OPEN_AI_SECRET_KEY,
};

route.post("/openai-gernate-images", async (req: Request, res: Response) => {
    const { _id, description, size }: OpenAiRequestBody = req.body;
    if (!_id && !description && !size) {
        throw new Error("Please provide request body.");
    }

    const openai = new OpenAI(configration);

    try {
        await MongoDB.open();
        const response = await openai.images.generate({
            n: 1,
            size: size,
            model: "dall-e-2",
            prompt: description,
        });

        if (!response.data[0].url) throw new Error("null url string.");

        const fetchPictureFromUrl = await fetch(response.data[0].url);
        const pictureBlob = await fetchPictureFromUrl.blob();

        const file = new File([pictureBlob], "dalle-e-2.png");

        const fileArrayBuffer = await file.arrayBuffer();
        const uint8 = new Uint8Array(fileArrayBuffer);
        const base64Data = Buffer.from(uint8).toString("base64");
        const dataURL = `data:application/octet-stream;base64,${base64Data}`;

        const isExists = await Picture.findOne({ ref_id: _id });
        if (!isExists) {
            const createPictureInstance = new Picture({
                ref_id: _id,
                pictures: [
                    {
                        size: size,
                        url: dataURL,
                        description: description,
                    },
                ],
            });

            await createPictureInstance.save();
            return res.status(200).send("ok");
        }

        await Picture.updateOne(
            {
                ref_id: _id,
            },
            {
                $push: {
                    pictures: {
                        description: description,
                        size: size,
                        url: dataURL,
                    },
                },
            }
        );
        return res.status(200).send("updated");
    } catch (error: any) {
        console.log(`Debug >>>>>> ${error}`);
        return res.status(500).send(error);
    } finally {
        await MongoDB.close();
    }
});

route.get("/openai-fetch-images", async (req, res) => {
    const { _id } = req.query;
    if (!_id) throw new Error("Invalid _id.");

    try {
        await MongoDB.open();

        const findPictures: HydratedDocument<IPicture> | null = await Picture.findOne({
            ref_id: _id,
        });

        return res.status(200).send(findPictures?.pictures);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    } finally {
        await MongoDB.close();
    }
});

export default route;
