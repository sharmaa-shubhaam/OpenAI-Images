import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks";

// getSession as initialstate....
const getSession = (): { _id: string; session: boolean } => {
    // get user_session object from the localstorage....
    // return empty session object if no session in storage...
    let hasSession = localStorage.getItem("user_session");
    if (!hasSession) return { _id: "", session: false };

    // otherwise return the session from the localstorage....
    return {
        _id: JSON.parse(hasSession)._id,
        session: JSON.parse(hasSession).session,
    };
};

// Creating the uses session reducer...
const userSessionReducer = createSlice({
    name: "user_session",
    initialState: getSession(),
    reducers: {
        createSession: (_, action: PayloadAction<{ session: boolean; _id: string }>) => {
            let session = {
                _id: action.payload._id,
                session: action.payload.session,
            };
            localStorage.setItem("user_session", JSON.stringify(session));
            return session;
        },
        deleteSession: (_, __: PayloadAction<void>) => {
            localStorage.removeItem("user_session");
            return {
                _id: "",
                session: false,
            };
        },
    },
});

export const userSession = (state: RootState) => state.userSession;
export const { createSession, deleteSession } = userSessionReducer.actions;

export default userSessionReducer.reducer;
