
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { initiateOAuth } from "@/app/actions/oauth";
import { useRouter } from "next/navigation";
import { useGetConnectUser } from "@/hooks/use-drive-query";

const ConntectApp = ({ action }: { action: AvailableAction }) => {
  const router = useRouter();
  const {
    data: email,
    isPending,
    isError,
  } = useGetConnectUser({ appName: action.service });

  const handleConnectApp = () => {
    initiateOAuth(action.service).then((res) => router.push(res));
  };

  if (isPending) return <div>Loading...</div>;
  // if (isError) return <div>App not connected</div>;

  return (
    <div className="w-full border rounded-md p-3 flex items-center justify-between">
      <div className=" flex items-center gap-3">
        <Image
          src={action.image}
          height={45}
          alt="action"
          width={45}
          className="object-contain"
          unoptimized
        />
        <div>
          <p className="uppercase font-semibold">{action.service}</p>

          {email && <span className="font-medium">{email}</span>}
        </div>
      </div>

      <Button onClick={handleConnectApp}>
        {email && "Change"}
        {isError && "Connect"}
      </Button>
    </div>
  );
};

export default ConntectApp;
