import { BACKEND_URL } from "@/config";
import { cookies } from "next/headers";

const cookieStore = cookies();
const token = cookieStore.get("token");

export const getGoogleDriveFolders = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/google/drive/folders`, {
      headers: {
        Authorization: `${token?.value}`,
      },
    });

    const data = await res.json();

    return data.folders;
  } catch (error) {
    return null;
  }
};
