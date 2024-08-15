import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { TZapCreate } from "@/schema/zod-schema";

const AvailableActions = ({
  availableActions,
  setActionOpen,
  form,
  actionIndex,
  handleActionSelect,
}: {
  availableActions: AvailableAction[];
  setActionOpen: (open: boolean) => void;
  form: UseFormReturn<TZapCreate>;
  actionIndex: number;
  handleActionSelect: (action: AvailableAction) => void;
}) => {
  
  const selectedActionId = form.watch(
    `actions.${actionIndex}.availableActionId`
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      {availableActions.map((item) => (
        <div
          onClick={() => handleActionSelect(item)}
          key={item.id}
          className={`flex items-center gap-3 p-2 cursor-pointer ${
            selectedActionId === item.id
              ? "border-2 rounded-lg border-primary"
              : ""
          }`}
        >
          <Image
            width={25}
            height={25}
            alt={item.name}
            src={item.image}
            unoptimized
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AvailableActions;
