import React from "react";
import OpenAI from "../assets/OpenAI.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch } from "./../redux/hooks";
import { isModalOpen } from "../redux/reducers/modal";
import { deleteSession } from "../redux/reducers/user_session";

export default function SideBar(): React.JSX.Element {
    const dispatch = useAppDispatch();

    return (
        <div className="w-[280px] bg-white h-screen space-y-5">
            <div className="flex items-center justify-between pt-2 px-4">
                <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
                    <img src={OpenAI} loading="lazy" alt="OpenAI" className="w-8" />
                </motion.div>

                <Link to="/" onClick={() => dispatch(deleteSession())}>
                    <img
                        src="https://ui-avatars.com/api/?name=Shubham+Sharma&&length=1&&background=000&&color=fff"
                        alt="profile"
                        className="w-9 h-9 rounded-full bg-transparent object-cover"
                    />
                </Link>
            </div>

            <div className="px-4">
                <button
                    className="w-full bg-blue-500 rounded py-2.5 text-white text-sm uppercase tracking-wide active:bg-blue-500/95"
                    onClick={() => dispatch(isModalOpen({ gernateImagePrompt: true }))}
                >
                    Gernate new image
                </button>
            </div>
        </div>
    );
}
