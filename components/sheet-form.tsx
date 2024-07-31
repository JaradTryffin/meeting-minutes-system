"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetFormProps {
  triggerButtonText: string;
  sheetTitle: string;
  sheetDescription: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SheetForm({
  triggerButtonText,
  sheetTitle,
  sheetDescription,
  children,
  open,
  setOpen,
}: SheetFormProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>{triggerButtonText}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>
        <div className="py-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
