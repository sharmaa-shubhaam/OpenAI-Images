import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks";

type Modal = {
    gernateImagePrompt?: boolean;
};

const ModalReducer = createSlice({
    name: "modals",
    initialState: <Modal>{
        gernateImagePrompt: false,
    },
    reducers: {
        isModalOpen: (state, { payload }: PayloadAction<Modal>) => {
            return (state = {
                gernateImagePrompt: payload.gernateImagePrompt,
            });
        },
    },
});

export const { isModalOpen } = ModalReducer.actions;
export const modals = (state: RootState) => state.modals;

export default ModalReducer.reducer;
