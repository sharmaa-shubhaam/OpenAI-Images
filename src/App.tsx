import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { modals } from "./redux/reducers/modal";
import { userSession } from "./redux/reducers/user_session";

// React Lazy loading......
const GernateImagePrompt = React.lazy(() => import("./@modal/GernateImagePrompt"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const OpenAI = React.lazy(() => import("./pages/OpenAI"));

// Main APP.
export default function App(): React.JSX.Element {
    const modal = useAppSelector(modals);
    const app = useAppSelector(userSession);

    return (
        <>
            <Routes>
                {app.session ? (
                    <Route path="/" element={<Suspense children={<OpenAI _id={app._id} />} />} />
                ) : (
                    <>
                        <Route path="/" element={<Suspense children={<SignIn />} />} />
                        <Route path="/signup" element={<Suspense children={<SignUp />} />} />
                    </>
                )}
            </Routes>
            {app.session && modal.gernateImagePrompt && (
                <Suspense children={<GernateImagePrompt _id={app._id} />} />
            )}
        </>
    );
}
