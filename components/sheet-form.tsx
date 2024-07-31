"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetFormProps {
  triggerButtonText: string;
  sheetTitle: string;
  sheetDescription: string;
  footerButtonText: string;
  children: React.ReactNode;
  formId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: () => void;
}

export function SheetForm({
  triggerButtonText,
  sheetTitle,
  sheetDescription,
  footerButtonText,
  children,
  formId,
  open,
  setOpen,
  onSubmit,
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
        <SheetClose asChild>
          <Button type="submit" form={formId} onClick={onSubmit}>
            {footerButtonText}
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
