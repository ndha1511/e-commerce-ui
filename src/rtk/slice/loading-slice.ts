import { createSlice,PayloadAction  } from "@reduxjs/toolkit";

interface LoadingState {
    triggerA: boolean;
    triggerB: boolean;
}

const initialState: LoadingState = {
    triggerA: false,
    triggerB: false,
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setTriggerA: (state, action: PayloadAction<boolean>) => {
            state.triggerA = action.payload;
        },
        setTriggerB: (state, action: PayloadAction<boolean>) => {
            state.triggerB = action.payload;
        },
    }
})
export const {setTriggerA, setTriggerB} = loadingSlice.actions
export default loadingSlice.reducer;