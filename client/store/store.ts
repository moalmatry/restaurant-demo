import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter-slice";
import personReducer from "./features/person/person-slice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "@/services/dummyData";
import authReducer from "./features/auth/auth-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    person: personReducer,
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
