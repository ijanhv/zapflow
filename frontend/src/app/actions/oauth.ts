"use server";
import { BACKEND_URL } from "@/config";

import { cookies } from "next/headers";


export async function initiateOAuth(serviceName: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/v1/google/oauth/${serviceName}`,
      {
        headers: {
          Authorization: `${token?.value}`,
        },
      }
    );
    const data = await response.json();
 
    if (data.url) {
      //   window.location.href = data.url; // Redirect the user to the OAuth UR
      return data.url
    }
  } catch (error) {
    console.error("Failed to get OAuth URL", error);
  }
}
