import mongoose from "mongoose";

interface IPictureBase {
    ref_id: string;
    pictures: {
        url: string;
        size: string;
        description: string;
    }[];
}

export interface IPicture extends IPictureBase {}

const PictureSchema = new mongoose.Schema<IPicture>({
    ref_id: { type: String, required: true },
    pictures: [
        {
            description: { type: String, required: true },
            size: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
});

const Picture = mongoose.models.picture || mongoose.model<IPicture>("picture", PictureSchema);

export default Picture;
