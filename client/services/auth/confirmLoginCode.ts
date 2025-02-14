import { API_LINK } from "@/constants";
import { UserResponse } from "@/types";

export const confirmLoginCodeFn = async (code: string, phone: string) => {
  try {
    const request = await fetch(`${API_LINK}/auth/confirm-login-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
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
