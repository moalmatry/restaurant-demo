"use client";

import { ID_KEY, NAME_KEY, PROFILE_IMG_KEY, TOKEN_KEY } from "@/constants";
import { getMe } from "@/services/user/getMe";
import {
  addId,
  addMessage,
  addName,
  addProfileImg,
  addToken,
  setAuthenticated,
  setIsLoading,
} from "@/store/features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useEffect } from "react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setIsLoading(true));
  //   const userData = async (token: string) => {
  //     return await getMe(token);
  //   };

  //   if (!token) {
  //     const id = localStorage.getItem(ID_KEY);
  //     const storedToken = localStorage.getItem(TOKEN_KEY);
  //     const name = localStorage.getItem(NAME_KEY);
  //     const profileImg = localStorage.getItem(PROFILE_IMG_KEY);
  //     if (!storedToken) {
  //       dispatch(setIsLoading(false));

  //       return;
  //     }
  //     if (storedToken && (!name || !profileImg || !id)) {
  //       userData(storedToken).then((user) => {
  //         if (user.status === "success") {
  //           dispatch(addId(user.data.id));
  //           dispatch(addToken(storedToken ?? ""));
  //           dispatch(addName(user.data.name));
  //           dispatch(addProfileImg(user.data.profileImg ?? ""));
  //           dispatch(setAuthenticated(true));
  //           dispatch(addMessage("Successfully added from the api"));
  //           localStorage.setItem(ID_KEY, user.data.id);
  //           localStorage.setItem(NAME_KEY, user.data.name);
  //           localStorage.setItem(PROFILE_IMG_KEY, user.data.profileImg ?? "");
  //         } else {
  //           localStorage.removeItem(TOKEN_KEY);
  //         }
  //       });
  //     } else {
  //       dispatch(addToken(storedToken ?? ""));
  //       dispatch(addId(id ?? ""));
  //       dispatch(addToken(storedToken ?? ""));
  //       dispatch(addName(name ?? ""));
  //       dispatch(addProfileImg(profileImg ?? ""));
  //       dispatch(setAuthenticated(true));
  //       dispatch(addMessage("Successfully added from the api"));
  //     }
  //   }
  //   dispatch(setIsLoading(false));
  // }, [dispatch, token]);
  return children;
};

export default SessionProvider;
