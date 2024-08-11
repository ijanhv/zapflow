import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import SingleZap from './single-zap';

const ActionDetails = ({ action }: { action: AvailableAction}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div>
          <SingleZap
            selected={!!action}
            configured={false}
            name={action?.name || "Action"}
            index={1}
          />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-16">
          <SheetTitle>{action?.name}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default ActionDetails