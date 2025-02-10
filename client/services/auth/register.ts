/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_LINK } from "@/constants";
import { RegisterProps, UserResponse } from "@/types";

export const register = async ({
  userData: { email, confirmPassword, password, phone, name },
}: RegisterProps) => {
  // try {
  const request = await fetch(`${API_LINK}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      confirmPassword,
      phone,
      name,
    }),
  });

  const result: UserResponse = await request.json();

  return result;
  // } catch (error: any) {
  //   return { status: "fail", message: error.message } as UserResponse;
  // }
};
