/* eslint-disable react/react-in-jsx-scope */
"use client";

import { HOOKS_URL } from "@/config";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<Zap>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          {row.original.actions.map((x) => (
            <Image
              key={x.id}
              src={x.type.image}
              width={20}
              height={20}
              alt="zap"
              className="w-[30px] h-[30px] object-contain"
              unoptimized
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "webhook",
    header: "Webhook URL",
    cell: ({ row }) => {
      return (
        <div className="">
          {`${HOOKS_URL}/hooks/catch/1/${row.original.id}`}
        </div>
      );
    },
  },
];
