"use server";

import { BACKEND_URL } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";


export const login = async (email: string, password: string) => {
try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        username: email,
        password,
      });

      // localStorage.setItem("token", res.data.token);
      cookies().set("token", res.data.token);

      return {
        success: "Logged in"
      }
} catch (error) {
    return {
        error: "Error "
      }
}
};
