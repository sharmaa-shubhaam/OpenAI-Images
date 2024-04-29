import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OpenAI from "../assets/OpenAI.png";
import { BiErrorAlt } from "react-icons/bi";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useAppDispatch } from "../redux/hooks";
import { createSession } from "../redux/reducers/user_session";

export default function SignUp(): React.JSX.Element {
    const disptach = useAppDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [credential, setCredential] = useState<{
        username: string;
        password: string;
    }>({
        username: "",
        password: "",
    });

    // Handle the input data.
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    // axios function for signup button.
    const sign_up = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            // if any of the input field is empty throw error.
            if (!credential.username || !credential.password)
                return setError("Enter all the fields.");

            // else send API request to the backend with axios.
            setError("");
            setLoading(true);
            const response = await axios({
                method: "POST",
                baseURL: "http://localhost:3001",
                url: "/signup",
                data: credential,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setCredential({ username: "", password: "" });
            disptach(createSession({ _id: response.data._id, session: true }));
            navigate("/", { replace: true });
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4 h-screen roboto">
            <div className="w-full md:w-[400px] bg-white px-6 py-2 rounded shadow">
                <div>
                    <div className="text-center py-6 flex items-center space-x-3">
                        <img src={OpenAI} alt="" className="w-7" />
                        <h1 className="uppercase text-2xl">sign up</h1>
                    </div>
                    <form method="POST" className="space-y-2 pb-6">
                        <div className="border border-gray-300 rounded bg-white">
                            <input
                                type="text"
                                name="username"
                                value={credential.username}
                                onChange={handleInput}
                                placeholder="EMAIL OR USERNAME"
                                className="w-full py-2.5 px-4 text-sm outline-none border-none bg-transparent"
                            />
                        </div>
                        <div className="border border-gray-300 rounded bg-white">
                            <input
                                type="password"
                                name="password"
                                value={credential.password}
                                onChange={handleInput}
                                placeholder="PASSWORD"
                                className="w-full py-2.5 px-4 text-sm outline-none border-none bg-transparent"
                            />
                        </div>
                        {error && (
                            <div className="py-2.5 bg-yellow-200 text-sm flex items-center justify-center space-x-2 rounded">
                                <BiErrorAlt className="text-xl" />
                                <span>{error}</span>
                            </div>
                        )}
                        <button
                            className="w-full py-2.5 uppercase text-white bg-blue-500 rounded text-sm flex items-center justify-center"
                            onClick={sign_up}
                        >
                            {loading ? (
                                <RotatingLines width="20" strokeColor="#fff" strokeWidth="2.5" />
                            ) : (
                                "sign up"
                            )}
                        </button>
                    </form>
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <hr className="w-full" />
                    <span className="text-sm">OR</span>
                    <hr className="w-full" />
                </div>
                <div className="py-4">
                    <Link to="/">
                        <button className="w-full py-2 uppercase border text-sm rounded">
                            sign in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
