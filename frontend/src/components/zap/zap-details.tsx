import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SingleZap from "./single-zap";

const ZapDetails = ({ trigger }: { trigger: AvailableTrigger | undefined }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div>
          <SingleZap
            selected={!!trigger}
            configured={false}
            name={trigger?.name || "Trigger"}
            index={1}
          />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-16">
          <SheetTitle>{trigger?.name}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ZapDetails;
