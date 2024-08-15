import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { TZapCreate } from "@/schema/zod-schema";

const AvailableTriggers = ({
  availableTriggers,
  setTriggerOpen,
  form,
}: {
  availableTriggers: AvailableTrigger[];
  setTriggerOpen: (open: boolean) => void;
  form: UseFormReturn<TZapCreate>;
}) => {
  const selectedTriggerId = form?.watch("availableTriggerId");

  const handleTriggerSelect = (trigger: AvailableTrigger) => {
    
    form.setValue("availableTriggerId", trigger.id);
    form.setValue("triggerMetadata", {});
    setTriggerOpen(false);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {availableTriggers.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 p-2 cursor-pointer ${
            selectedTriggerId === item.id && "border-2 rounded-lg border-primary"
          }`}
          onClick={() => handleTriggerSelect(item)}
        >
          <Image
            width={20}
            height={20}
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

export default AvailableTriggers;