import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { picture, fetchPictures } from "../redux/reducers/picture";

export default function OpenAI({ _id }: { _id: string }): React.JSX.Element {
    const dispatch = useAppDispatch();
    const pictures = useAppSelector(picture);

    useEffect(() => {
        dispatch(fetchPictures(_id));
    }, []);

    return (
        <div className="flex roboto relative">
            <SideBar />
            <div className="flex-1 h-screen overflow-y-auto">
                <div className="h-auto overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pictures.map((pic, i) => {
                        return (
                            <div
                                key={i}
                                className={`bg-white rounded-md overflow-hidden shadow p-0 ${
                                    i == 0 && "col-span-2 row-span-2"
                                }`}
                            >
                                <img
                                    src={pic.url}
                                    alt={pic.description}
                                    className="object-cover aspect-[2/1.5] bg-red-100"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
