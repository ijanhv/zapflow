import React from "react";
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data }: any) => {
  return (
    <div className="px-4 py-2 shadow-sm rounded-md bg-white border-2 ">
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
            {data.icon}
          </div>
          <div className="ml-2">
            <div className="text-lg font-bold">{data.title}</div>
            <div className="text-gray-500">{data.subline}</div>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
};

export default CustomNode;
