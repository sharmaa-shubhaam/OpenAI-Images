import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks";
import axios from "axios";

interface Picture {
    description: string;
    size: string;
    url: string;
}

export const fetchPictures = createAsyncThunk("pictures", async (_id: string) => {
    try {
        if (_id === "") return [];
        const response = await axios({
            method: "GET",
            withCredentials: true,
            url: `/openai-fetch-images/`,
            baseURL: "http://localhost:3001",
            params: { _id: _id },
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data as Picture[];
    } catch (error) {
        console.log(error);
        return [];
    }
});

const pictureReducer = createSlice({
    name: "pictures",
    initialState: <Picture[]>[],
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchPictures.fulfilled, (_, action: PayloadAction<Picture[]>) => {
            return action.payload;
        });
    },
});

export const picture = (state: RootState) => state.pictures;

export default pictureReducer.reducer;
