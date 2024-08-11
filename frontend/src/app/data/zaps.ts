import { BACKEND_URL } from "@/config";
import { cookies } from "next/headers";

export const getUserZaps = async (): Promise<Zap[]> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const res = await fetch(`${BACKEND_URL}/api/v1/zap`, {
    headers: {
      Authorization: `${token?.value}`,
    },
    next: {
      tags: ["my-zaps"],
    },
  });

  const data = await res.json();


  return data.zaps;
};
