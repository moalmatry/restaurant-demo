import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type SupportedLocales = "ar" | "en";
export type Direction = "ltr" | "rtl";

export interface Locale {
  currentLanguage: SupportedLocales;
  currentDirection: Direction;
}
const initialState: Locale = {
  currentLanguage: "ar",
  currentDirection: "ltr",
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setCurrentLocale: (state, data: PayloadAction<SupportedLocales>) => {
      state.currentLanguage = data.payload;
      state.currentDirection = data.payload === "ar" ? "rtl" : "ltr";
    },
    // decrement: (state) => {
    //   state.currentLanguage -= 1;
    // },
    // incrementByAmount: (state, amount: PayloadAction<number>) => {
    //   state.currentLanguage += amount.payload;
    // },
  },
});

const localeReducer = localeSlice.reducer;
export const { setCurrentLocale } = localeSlice.actions;
export default localeReducer;
