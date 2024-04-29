import React, { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useAppDispatch } from "./../redux/hooks";
import { isModalOpen } from "../redux/reducers/modal";
import axios from "axios";
import { fetchPictures } from "../redux/reducers/picture";

export default function GernateImagePrompt({ _id }: { _id: string }): React.JSX.Element {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const selectSize = ["Select Size", "256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"];
    const [data, setData] = useState({ description: "", size: "", _id: _id });

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const gernate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (!data.description || !data.size) return;

            setLoading(true);
            await axios({
                method: "POST",
                baseURL: "http://localhost:3001",
                url: "/openai-gernate-images",
                withCredentials: true,
                data,
            });
            setData({ description: "", size: "", _id: _id });
            dispatch(isModalOpen({ gernateImagePrompt: false }));
            dispatch(fetchPictures(_id));
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-full sm:w-[400px] h-auto bg-white absolute sm:right-14 bottom-0 shadow-lg rounded-tr-lg rounded-tl-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-gray-100">
                    <h1 className="text-sm uppercase font-semibold">Gernate AI Image</h1>
                    <MdOutlineClear
                        className="text-lg cursor-pointer"
                        onClick={() => dispatch(isModalOpen({ gernateImagePrompt: false }))}
                    />
                </div>

                <form
                    name="gernate-image-prompt-form"
                    className=" space-y-2 roboto px-3 py-2 bg-white"
                >
                    <select
                        name="size"
                        onChange={handleInput}
                        value={data.size}
                        className="w-full border-b outline-none rounded cursor-pointer py-2.5 text-sm"
                    >
                        {selectSize.map((size, id) => (
                            <option value={size} key={id}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <div>
                        <textarea
                            cols={10}
                            rows={10}
                            name="description"
                            onChange={handleInput}
                            value={data.description}
                            spellCheck="false"
                            className="w-full resize-none outline-none border-none text-sm bg-transparent"
                        />
                    </div>
                    <button
                        className="w-full py-2.5 bg-blue-500 text-white rounded uppercase text-sm flex items-center justify-center"
                        onClick={gernate}
                    >
                        {loading ? <ThreeDots height={20} width={36} color="#fff" /> : "Gernate"}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
