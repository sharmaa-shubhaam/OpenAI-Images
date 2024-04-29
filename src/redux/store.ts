import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./reducers/modal";
import userSessionReducer from "./reducers/user_session";
import pictureReducer from "./reducers/picture";

const store = configureStore({
    reducer: {
        modals: ModalReducer,
        userSession: userSessionReducer,
        pictures: pictureReducer,
    },
});

export default store;
