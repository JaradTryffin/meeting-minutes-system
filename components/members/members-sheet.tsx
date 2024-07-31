"use client";

import { SheetForm } from "@/components/sheet-form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email(),
});

export function MemberSheet() {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setOpen(false);
  }

  return (
    <SheetForm
      triggerButtonText="Add Member"
      sheetTitle="Add Member"
      sheetDescription="Add a member to team"
      open={open}
      setOpen={setOpen}
    >
      <Form {...form}>
        <form
          className="w-full space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jarad" {...field} />
                </FormControl>
                <FormDescription>This is your public name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            name="name"
          />

          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jaradtryffin23@gmail.com" {...field} />
                </FormControl>
                <FormDescription>This is your public name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            name="email"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </SheetForm>
  );
}
