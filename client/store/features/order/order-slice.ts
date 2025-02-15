import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Order {
  id: string;
}
const initialState: Order = {
  id: "",
};

export const orderSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addOrderId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

const orderReducer = orderSlice.reducer;
export const { addOrderId } = orderSlice.actions;
export default orderReducer;
