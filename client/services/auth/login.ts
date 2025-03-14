import { API_LINK } from "@/constants";
import { UserResponse } from "@/types";

export const loginFn = async (phone: string) => {
  try {
    const request = await fetch(`${API_LINK}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
      }),
    });
    const result: UserResponse = await request.json();
    console.log(result);
    // await SecureStore.setItemAsync(TOKEN_KEY, result.token);

    return result;
  } catch (error: any) {
    return { status: "fail", message: error.message } as UserResponse;
  }
};
