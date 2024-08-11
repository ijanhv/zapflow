"use client";
import React, { useState } from "react";
import SingleZap from "./single-zap";
import { CommonDialog } from "../common/dialog";
import { Plus } from "lucide-react";
import AvailableActions from "./available-actions";
import AvailableTriggers from "./available-trigger";
import { Button } from "../ui/button";
import ZapDetails from "./zap-details";
import SelectedAction from "./selected-action";

const CreateZap = ({
  availableTriggers,
  availableActions,
}: {
  availableTriggers: AvailableTrigger[];
  availableActions: AvailableAction[];
}) => {
  const [selectedTrigger, setSelectedTrigger] = useState<
    AvailableTrigger | undefined
  >();
  const [selectedActions, setSelectedActions] = useState<AvailableAction[]>([]);
  const [triggerOpen, setTriggerOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [editingActionIndex, setEditingActionIndex] = useState<number | null>(
    null
  );
  const [selectedAction, setSelectedAction] = useState<AvailableAction | null>(
    null
  );

  const handleActionSelect = (action: AvailableAction) => {
    if (editingActionIndex !== null) {
      // Editing existing action
      const newActions = [...selectedActions];
      newActions[editingActionIndex] = action;
      setSelectedActions(newActions);
    } else {
      // Adding new action
      setSelectedActions([...selectedActions, action]);
    }
    setSelectedAction(action); // Update selected action
    setActionOpen(false); // Close the action dialog
  };

  const openActionModal = (index?: number) => {
    if (index !== undefined) {
      setEditingActionIndex(index);
      setSelectedAction(selectedActions[index]); // Set selected action for editing
    } else {
      setEditingActionIndex(null);
      setSelectedAction(null); // Clear selected action for new action
    }
    setActionOpen(true);
  };

  return (
    <div className="flex flex-col gap-3">
      {!selectedTrigger?.id ? (
        <CommonDialog
          setOpen={setTriggerOpen}
          open={triggerOpen}
          buttonVariant={"default"}
          content={
            <AvailableTriggers
              setTriggerOpen={setTriggerOpen}
              availableTriggers={availableTriggers}
              selectedTrigger={selectedTrigger}
              setSelectedTrigger={setSelectedTrigger}
            />
          }
          title="Select a Trigger"
          description="Select a trigger from the available triggers"
          trigger={
            <div>
              <SingleZap
                selected={!!selectedTrigger}
                configured={false}
                name={selectedTrigger?.name || "Trigger"}
                index={1}
              />
            </div>
          }
        />
      ) : (
        <ZapDetails trigger={selectedTrigger} />
      )}

      {selectedActions.map((action, index) => (
        <SelectedAction  key={index}  action={action} openActionModal={openActionModal} index={index} />
      ))}

      <CommonDialog
        open={actionOpen}
        setOpen={setActionOpen}
        buttonVariant={"default"}
        content={
          <AvailableActions
            availableActions={availableActions}
            onActionSelect={handleActionSelect}
            setActionOpen={setActionOpen}
            selectedAction={selectedAction!} // Pass the selected action for editing
          />
        }
        title="Select an action"
        description="Select an action from the available actions"
        trigger={
          <div className="mx-auto">
            <Button onClick={() => openActionModal()}>
              <Plus />
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default CreateZap;
