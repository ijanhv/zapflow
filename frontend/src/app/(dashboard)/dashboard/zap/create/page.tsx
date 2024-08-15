import { getAvailableActions, getAvailableTriggers } from "@/app/data/actions";
import {CreateNewZap} from "@/components/zap/create-new-zap"
import React from "react";

const CreateNewZapPage = async () => {
  const availableActions = await getAvailableActions();
  const availableTriggers = await getAvailableTriggers();

  return (
    <div className="h-full w-full grid place-content-center">

      <CreateNewZap 
       availableTriggers={availableTriggers || []}
       availableActions={availableActions || []}
       />
    </div>
  );
};

export default CreateNewZapPage;
