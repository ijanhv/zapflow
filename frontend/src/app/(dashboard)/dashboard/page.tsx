import React from "react";

import type { Metadata } from "next";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DarkButton } from "@/components/buttons/dark-button";
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
    <ContentLayout title="Dashboard">
      <div className="flex items-center gap-4 justify-between w-full ">

      <div className="text-2xl font-bold">My Zaps</div>
        <Link
          href="/zap/create"
        >
          <Button className="bg-amber-700">
            Create New Zap
          </Button>
        </Link>
      </div>

      <ZapTable zaps={zaps} />
    </ContentLayout>
  );
}
