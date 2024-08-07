"use client";
import { HOOKS_URL } from "@/config";
import { useRouter } from "next/navigation";
import { LinkButton } from "../buttons/link-button";

export default function ZapTable({ zaps }: { zaps: any[] }) {
  const router = useRouter();

  return (
    <div className="py-8  w-full">
      <div className="flex">
        <div className="flex-1">Name</div>
        <div className="flex-1">ID</div>
        <div className="flex-1">Created at</div>
        <div className="flex-1">Webhook URL</div>
        <div className="flex-1">Go</div>
      </div>
      {zaps.map((z) => (
        <div className="flex border-b border-t py-4">
          <div className="flex-1 flex">
            <img src={z.trigger.type.image} className="w-[30px] h-[30px]" />{" "}
            {z.actions.map((x: any) => (
              <img src={x.type.image} className="w-[30px] h-[30px]" />
            ))}
          </div>
          <div className="flex-1">{z.id}</div>
          <div className="flex-1">Nov 13, 2023</div>
          <div className="flex-1">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
          <div className="flex-1">
            <LinkButton
              onClick={() => {
                router.push("/zap/" + z.id);
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
}
