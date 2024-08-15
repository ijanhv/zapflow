"use server"
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";

export const publishZap = async (data: any) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/zap`, data, {
      headers: {
        Authorization: `${token?.value}`,
      },
    });

    return {
      success: "Zap Created",
    };
  } catch (error) {
    return {
      error: "Error ",
    };
  }
};
