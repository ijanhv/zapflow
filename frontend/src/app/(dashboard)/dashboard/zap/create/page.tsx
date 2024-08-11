import { getAvailableActions, getAvailableTriggers } from "@/app/data/actions";
import CreateZap from "@/components/zap/create-zap";
import React from "react";

const CreateNewZap = async () => {
  const availableActions = await getAvailableActions();
  const availableTriggers = await getAvailableTriggers();


  return (
    <div className="h-full w-full grid place-content-center">
      <CreateZap
        availableTriggers={availableTriggers || []}
        availableActions={availableActions || []}
      />
    </div>
  );
};

export default CreateNewZap;
