import { createSlice } from "@reduxjs/toolkit";

export interface SocketStatus {
  connected: boolean;
}

const initialState: SocketStatus = {
  connected: false,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state) => {
      state.connected = true;
    },
    setDisConnected: (state) => {
        state.connected = false;
    }
  },
});
export const { setConnected, setDisConnected } = socketSlice.actions;

export default socketSlice.reducer;
