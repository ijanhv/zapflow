import React from "react";

import type { Metadata } from "next";
import { getUserZaps } from "@/app/data/zaps";
import ZapTable from "@/components/table/zap-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Zapier Dashboard ",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function Dashboard() {
  const zaps = await getUserZaps();

  return (
    <div className="flex flex-1 bg-foreground/5">
      <div className="p-2 md:p-10 rounded-tl-2xl border  border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex flex-col gap-3  w-full ">
          <div className="flex items-center  gap-4 justify-between w-full ">
            <div className="text-2xl font-bold">My Zaps</div>
            <Link href="/dashboard/zap/create">
              <Button className="bg-amber-700 hover:bg-amber-800">
                Create New Zap
              </Button>
            </Link>
          </div>

          <ZapTable zaps={zaps} />
        </div>
      </div>
    </div>
  );
}
