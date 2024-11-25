import { createSlice } from "@reduxjs/toolkit";

interface OrderProps{
    orderId: string;
}

const initialState : OrderProps = {
    orderId: '',
}
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderId: (state, action) => {
         state.orderId = action.payload;
        }
    }
})
export const {setOrderId} = orderSlice.actions
export default orderSlice.reducer;