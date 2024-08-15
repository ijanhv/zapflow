
import React from "react";

const SingleZap = ({
  name,
  index,
  selected,
  configured,
}: {
  name: string;
  index: number;
  selected: boolean;
  configured: boolean;
}) => {

  return (
    <div
      className={`border border-black py-8 px-8 rounded-lg flex w-[300px] justify-center  items-center gap-4 cursor-pointer 
    
        ${!selected && "border-dashed"}
    `}
    >
      <div className="flex text-xl">
        <div className="font-bold">{index}. </div>
        <div>{name}</div>
      </div>

    </div>
  );
};

export default SingleZap;
