"use client";
import { z } from "zod";
import { useMeetingItemSheet } from "@/hooks/use-sheet";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SheetForm } from "@/components/sheet-form";
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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import apiClient from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { Person, StatusType } from "@prisma/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { ToastAction } from "@/components/ui/toast";

const FormSchema = z.object({
  description: z
    .string()
    .min(2, { message: "A Short description is required" }),
  dueDate: z.date({
    required_error: "A due date is required",
  }),
  status: z.string({
    required_error: "A status type is required",
  }),
  actionRequired: z
    .string()
    .min(2, { message: "please state action required" }),
  responsiblePersonId: z.string({
    required_error: "A Person must be responsible for item.",
  }),
});

export function MeetingItemSheet() {
  const meetingItemSheet = useMeetingItemSheet();
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const [members, setMembers] = useState<Person[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  console.log("params", params);
  const fetchStatus = async () => {
    await apiClient
      .get("/status-types")
      .then((res) => setStatuses(res.data))
      .catch((error) => console.log("failed to fetched statuses type"));
  };

  const fetchMembers = async () => {
    await apiClient
      .get("/persons")
      .then((res) => setMembers(res.data))
      .catch((error) => console.log("failed to fetch memebers"));
  };

  useEffect(() => {
    fetchStatus();
    fetchMembers();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await apiClient
        .post("meeting-items", {
          description: data.description,
          dueDate: data.dueDate,
          meetingId: params.id,
          status: data.status,
          actionRequired: data.actionRequired,
          responsiblePersonId: data.responsiblePersonId,
        })
        .then((res) => {
          toast({
            description: `${res.data.name} Updated`,
          });
          router.refresh();
          form.reset();
        });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.s",
        variant: "destructive",
        description: "There was a problem with your request",
        action: <ToastAction altText="Try Again">Try again</ToastAction>,
      });
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  const handleClose = () => {
    meetingItemSheet.onClose();
    form.reset();
  };

  return (
    <SheetForm
      triggerButtonText="Add Meeting Item"
      sheetTitle="Meeting Item"
      sheetDescription="Add meeting Item"
      open={meetingItemSheet.isOpen}
      setOpen={(open) => (open ? meetingItemSheet.onOpen() : handleClose())}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Budget 2014.." {...field} />
                </FormControl>
                <FormDescription>
                  Enter a short description on meeting item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Input a Due Date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? statuses.find((status) => status.id === field.value)
                              ?.name
                          : "Select Status"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search Status..." />
                      <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                          {statuses.map((status) => (
                            <CommandItem
                              value={status.name}
                              key={status.id}
                              onSelect={() => {
                                form.setValue("status", status.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  status.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {status.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the initial status of the item.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="actionRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Prepare financial forcast..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a action that needs to take place.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="responsiblePersonId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Responsible Member</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? members.find((member) => member.id === field.value)
                              ?.name
                          : "Select Member"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search Members..." />
                      <CommandList>
                        <CommandEmpty>No Member found.</CommandEmpty>
                        <CommandGroup>
                          {members.map((member) => (
                            <CommandItem
                              value={member.name}
                              key={member.id}
                              onSelect={() => {
                                form.setValue("responsiblePersonId", member.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  member.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {member.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This will be the member responsible for the item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </SheetForm>
  );
}
