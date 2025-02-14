import {
  ID_KEY,
  NAME_KEY,
  PHONE_KEY,
  PROFILE_IMG_KEY,
  TOKEN_KEY,
} from "@/constants";
import { storeData } from "@/lib/locale-storage/storeData";
import { confirmLoginCodeFn } from "@/services/auth/confirmLoginCode";
import { loginFn } from "@/services/auth/login";
import { register } from "@/services/auth/register";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export interface Auth {
  id: string;
  authenticated: boolean;
  token: string | undefined;
  name: string;
  profileImg: string;
  phone: string;
  message: string;
  isLoading: boolean;
}

const initialState: Auth = {
  authenticated: false,
  id: "",
  token: undefined,
  name: "",
  profileImg: "",
  phone: "",
  message: "",
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, payload: PayloadAction<string>) => {
      state.token = payload.payload;
    },
    addId: (state, payload: PayloadAction<string>) => {
      state.id = payload.payload;
    },
    addName: (state, payload: PayloadAction<string>) => {
      state.name = payload.payload;
    },
    addProfileImg: (state, payload: PayloadAction<string>) => {
      state.profileImg = payload.payload;
    },
    addPhone: (state, payload: PayloadAction<string>) => {
      state.phone = payload.payload;
    },
    addMessage: (state, payload: PayloadAction<string>) => {
      state.message = payload.payload;
    },
    setAuthenticated: (state, payload: PayloadAction<boolean>) => {
      state.authenticated = payload.payload;
    },

    setIsLoading: (state, payload: PayloadAction<boolean>) => {
      state.isLoading = payload.payload;
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = "";
      // NOTE: In Mobile replace it with expo-secure-store etc......
      storeData(ID_KEY, "").then((data) => console.log(data));
      SecureStore.setItem(TOKEN_KEY, "");
      storeData(NAME_KEY, "").then((data) => console.log(data));
      storeData(PROFILE_IMG_KEY, "").then((data) => console.log(data));
      storeData(PHONE_KEY, "").then((data) => console.log(data));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<Auth>) => {
      state.authenticated = action.payload.authenticated;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.profileImg = action.payload.profileImg;
      state.isLoading = action.payload.isLoading;
      // NOTE: In Mobile replace it with expo-secure-store
      storeData(ID_KEY, action.payload.id).then((data) => console.log(data));

      SecureStore.setItem(TOKEN_KEY, action.payload.token as string);

      storeData(NAME_KEY, action.payload.name).then((data) =>
        console.log(data)
      );
      storeData(PROFILE_IMG_KEY, action.payload.profileImg).then((data) =>
        console.log(data)
      );
      storeData(PHONE_KEY, action.payload.phone).then((data) =>
        console.log(data)
      );
    });

    builder.addCase(
      confirmLoginCode.fulfilled,
      (state, action: PayloadAction<Auth>) => {
        state.authenticated = action.payload.authenticated;
        state.token = action.payload.token;
        state.name = action.payload.name;
        state.profileImg = action.payload.profileImg;
        state.isLoading = action.payload.isLoading;
        // NOTE: In Mobile replace it with expo-secure-store
        storeData(ID_KEY, action.payload.id).then((data) => console.log(data));

        SecureStore.setItem(TOKEN_KEY, action.payload.token as string);

        storeData(NAME_KEY, action.payload.name).then((data) =>
          console.log(data)
        );
        storeData(PROFILE_IMG_KEY, action.payload.profileImg).then((data) =>
          console.log(data)
        );
        storeData(PHONE_KEY, action.payload.phone).then((data) =>
          console.log(data)
        );
      }
    );
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<Auth>) => {
      state.authenticated = action.payload.authenticated;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.profileImg = action.payload.profileImg;
      state.isLoading = action.payload.isLoading;
      // NOTE: In Mobile replace it with expo-secure-store etc......
      storeData(ID_KEY, action.payload.id).then((data) => console.log(data));

      SecureStore.setItem(TOKEN_KEY, action.payload.token as string);

      storeData(NAME_KEY, action.payload.name).then((data) =>
        console.log(data)
      );
      storeData(PROFILE_IMG_KEY, action.payload.profileImg).then((data) =>
        console.log(data)
      );
      storeData(PHONE_KEY, action.payload.phone).then((data) =>
        console.log(data)
      );
    });
  },
});

export const login = createAsyncThunk<Auth, { phone: string }>(
  "auth/login",
  async ({ phone }) => {
    try {
      const user = await loginFn(phone);
      return {
        isLoading: false,
        authenticated: false,
        token: "",
        profileImg: "",
        id: "",
        name: "",
        phone: "",
        message: user.message,
      };
    } catch (e: any) {
      console.log(e);
      return {
        isLoading: false,
        authenticated: false,
        token: "",
        profileImg: "",
        id: "",
        name: "",
        phone: "",
        message: e.message ?? "",
      };
    }
  }
);

export const confirmLoginCode = createAsyncThunk<
  Auth,
  { code: string; phone: string }
>("auth/confirmLoginCode", async ({ code, phone }) => {
  try {
    const user = await confirmLoginCodeFn(code, phone);

    return {
      isLoading: false,
      authenticated: false,
      token: user.token,
      profileImg: user.data.profileImg!,
      id: user.data.id,
      name: user.data.name,
      phone: user.data.phone ?? "",
      message: "Login successfully",
    };
  } catch (e: any) {
    console.log(e);
    return {
      isLoading: false,
      authenticated: false,
      token: "",
      profileImg: "",
      id: "",
      name: "",
      phone: "",
      message: e.message ?? "",
    };
  }
});
export const signup = createAsyncThunk<
  Auth,
  {
    email: string;
    password: string;
    name: string;
    phone: string;
    confirmPassword: string;
  }
>("auth/signup", async (registerData) => {
  try {
    const user = await register({ userData: registerData });
    return {
      isLoading: false,
      authenticated: user.token ? true : false,
      token: user.token,
      profileImg: user.data.profileImg ?? "",
      id: user.data.id,
      name: user.data.name,
      phone: user.data.phone ?? "",
      message: user.message ?? "",
    };
  } catch (e: any) {
    console.log(e);
    return {
      isLoading: false,
      authenticated: false,
      token: "",
      profileImg: "",
      id: "",
      name: "",
      phone: "",
      message: e.message,
    };
  }
});

const authReducer = authSlice.reducer;
export const {
  logout,
  addToken,
  addMessage,
  addId,
  addName,
  addPhone,
  addProfileImg,
  setAuthenticated,
  setIsLoading,
} = authSlice.actions;

export default authReducer;
