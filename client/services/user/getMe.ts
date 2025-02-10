import { API_LINK } from "@/constants";
import { UserResponse } from "@/types";

export const getMe = async (token: string) => {
  // try {
  const request = await fetch(`${API_LINK}/users/get-me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result: UserResponse = await request.json();

  return result;
  // } catch (error: any) {
  //   return { status: "fail", message: error.message } as UserResponse;
  // }
};
