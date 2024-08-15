import { BACKEND_URL } from "@/config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getDriveFolders = async () => {
  const res = await axios.get(`${BACKEND_URL}/api/v1/google/drive/folders`, {
    headers: {
      Authorization: `${Cookies.get("token")}`,
    },
  });
  return res.data.folders;
};

export const useGetDriveFoldersQuery = (): UseQueryResult<any[]> => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: getDriveFolders,
    staleTime: Infinity,
  });
};

const getConnectUser = async ({ appName }: { appName: string }) => {
  const res = await axios.get(`${BACKEND_URL}/api/v1/google/user/${appName}`, {
    headers: {
      Authorization: `${Cookies.get("token")}`,
    },
  });
  return res.data.email;
};

export const useGetConnectUser = ({
  appName,
}: {
  appName: string;
}): UseQueryResult<any[]> => {
  return useQuery({
    queryKey: ["user", appName],
    queryFn: () => getConnectUser({ appName }),
    staleTime: Infinity,
  });
};
