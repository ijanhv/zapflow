import React from "react";

import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function ZapTable({ zaps }: { zaps: any[] }) {
  return (
    <div className="py-8  w-full ">
      <DataTable data={zaps} columns={columns} />
    </div>
  );
}
