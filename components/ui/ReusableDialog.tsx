import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReusableDialogProps {
  buttonText: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function ReusableDialog({
  buttonText,
  title,
  description,
  children,
}: ReusableDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
