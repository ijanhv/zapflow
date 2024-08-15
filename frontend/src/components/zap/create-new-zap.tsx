"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { CommonDialog } from "../common/dialog";
import { Plus } from "lucide-react";
import AvailableActions from "./available-actions";
import AvailableTriggers from "./available-trigger";
import ZapDetails from "./zap-details";
import SelectedAction from "./selected-action";
import { publishZap } from "@/app/actions/zap";
import { TZapCreate, ZapCreateSchema } from "@/schema/zod-schema";
import SingleZap from "./single-zap";

export function CreateNewZap({
  availableTriggers,
  availableActions,
}: {
  availableTriggers: AvailableTrigger[];
  availableActions: AvailableAction[];
}) {
  const [triggerOpen, setTriggerOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [editingActionIndex, setEditingActionIndex] = useState<number | null>(
    null
  );

  const form = useForm<TZapCreate>({
    resolver: zodResolver(ZapCreateSchema),
    defaultValues: {
      availableTriggerId: "",
      triggerMetadata: {},
      actions: [],
    },
  });

  const router = useRouter();

  const handlePublishZap = (data: TZapCreate) => {
    publishZap(data).then((res) => {
      if (res.success) {
        router.push("/dashboard");
        form.reset();
      }
    });
  };

  const openActionModal = (index?: number) => {
    setEditingActionIndex(
      index !== undefined ? index : form.getValues("actions").length
    );
    setActionOpen(true);
  };

  const handleActionSelect = (action: AvailableAction) => {
    const currentActions = form.getValues("actions");
    const newActions =
      editingActionIndex !== null
        ? [
            ...currentActions.slice(0, editingActionIndex),
            { availableActionId: action.id, actionMetadata: {} },
            ...currentActions.slice(editingActionIndex + 1),
          ]
        : [
            ...currentActions,
            { availableActionId: action.id, actionMetadata: {} },
          ];

    form.setValue("actions", newActions);
    setActionOpen(false);
    setEditingActionIndex(null);
  };

  const selectedTriggerId = form.watch("availableTriggerId");
  const selectedActions = form.watch("actions");

  return (
    <form
      onSubmit={form.handleSubmit(handlePublishZap)}
      className="flex flex-col gap-3"
    >
      <Button type="submit">Publish Zap</Button>

      {!selectedTriggerId ? (
        <CommonDialog
          setOpen={setTriggerOpen}
          open={triggerOpen}
          buttonVariant="default"
          content={
            <AvailableTriggers
              setTriggerOpen={setTriggerOpen}
              availableTriggers={availableTriggers}
              form={form}
            />
          }
          title="Select a Trigger"
          description="Select a trigger from the available triggers"
          trigger={
            <div>
              <SingleZap
                selected={!!selectedTriggerId}
                configured={false}
                name={
                  selectedTriggerId
                    ? availableTriggers.find((t) => t.id === selectedTriggerId)
                        ?.name || "Trigger"
                    : "Trigger"
                }
                index={1}
              />
            </div>
          }
        />
      ) : (
        <ZapDetails
          trigger={availableTriggers.find((t) => t.id === selectedTriggerId)}
        />
      )}

      {selectedActions.map((action, index) => (
        <SelectedAction
          key={index}
          action={
            availableActions.find((a) => a.id === action.availableActionId) ||
            undefined
          }
          openActionModal={openActionModal}
          index={index}
          form={form}
        />
      ))}

      <CommonDialog
        open={actionOpen}
        setOpen={setActionOpen}
        buttonVariant="default"
        content={
          <AvailableActions
            availableActions={availableActions}
            setActionOpen={setActionOpen}
            form={form}
            handleActionSelect={handleActionSelect}
            actionIndex={
              editingActionIndex !== null
                ? editingActionIndex
                : selectedActions.length
            }
          />
        }
        title="Select an Action"
        description="Select an action from the available actions"
        trigger={
          <div className="mx-auto">
            <Button type="button" onClick={() => openActionModal()}>
              <Plus />
            </Button>
          </div>
        }
      />
    </form>
  );
}
