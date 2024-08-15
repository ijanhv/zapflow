import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"

export function CommonDialog({
  title,
  description,
  actionText,
  buttonVariant,
  onAction,
  content,
  trigger,
  open,
  setOpen,
}: {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void
  description: string;
  trigger: React.ReactNode;
  actionText?: string;
  buttonVariant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  onAction?: () => void;
  content: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          {actionText && (
            <Button variant={buttonVariant} onClick={onAction}>
              {actionText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}