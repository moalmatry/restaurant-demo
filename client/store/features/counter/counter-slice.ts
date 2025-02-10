import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Counter {
  value: number;
}
const initialState: Counter = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, amount: PayloadAction<number>) => {
      state.value += amount.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      incrementAsync.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      }
    );
  },
});

export const incrementAsync = createAsyncThunk(
  "counter/increment",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return amount;
  }
);

const counterReducer = counterSlice.reducer;
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterReducer;
