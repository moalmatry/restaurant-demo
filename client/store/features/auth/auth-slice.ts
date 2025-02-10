/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID_KEY, NAME_KEY, PROFILE_IMG_KEY, TOKEN_KEY } from "@/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginFn } from "@/services/auth/login";
import { register } from "@/services/auth/register";
export interface Auth {
  id: string;
  authenticated: boolean;
  token: string;
  name: string;
  profileImg: string;
  message: string;
  isLoading: boolean;
}

const initialState: Auth = {
  authenticated: false,
  id: "",
  token: "",
  name: "",
  profileImg: "",
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
      // localStorage.removeItem(TOKEN_KEY);
      // localStorage.removeItem(ID_KEY);
      // localStorage.removeItem(NAME_KEY);
      // localStorage.removeItem(PROFILE_IMG_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<Auth>) => {
      state.authenticated = action.payload.authenticated;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.profileImg = action.payload.profileImg;
      state.isLoading = action.payload.isLoading;
      // NOTE: In Mobile replace it with expo-secure-store etc......
      // localStorage.setItem(ID_KEY, action.payload.id);
      // localStorage.setItem(TOKEN_KEY, String(action.payload.token));
      // localStorage.setItem(NAME_KEY, action.payload.name);
      // localStorage.setItem(PROFILE_IMG_KEY, action.payload.profileImg);
    });
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<Auth>) => {
      state.authenticated = action.payload.authenticated;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.profileImg = action.payload.profileImg;
      state.isLoading = action.payload.isLoading;
      // NOTE: In Mobile replace it with expo-secure-store etc......
      // localStorage.setItem(ID_KEY, action.payload.id);
      // localStorage.setItem(TOKEN_KEY, String(action.payload.token));
      // localStorage.setItem(NAME_KEY, action.payload.name);
      // localStorage.setItem(PROFILE_IMG_KEY, action.payload.profileImg);
    });
  },
});

export const login = createAsyncThunk<
  Auth,
  { email: string; password: string }
>("auth/login", async ({ email, password }) => {
  try {
    const user = await loginFn(email, password);
    return {
      isLoading: false,
      authenticated: user.token ? true : false,
      token: user.token,
      profileImg: user.data.profileImg ?? "",
      id: user.data.id,
      name: user.data.name,
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
  addProfileImg,
  setAuthenticated,
  setIsLoading,
} = authSlice.actions;

export default authReducer;
