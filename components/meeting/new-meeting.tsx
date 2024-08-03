"use client";
import { useEffect, useState } from "react";
import { MeetingType } from "@prisma/client";
import apiClient from "@/lib/apiClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useMeetingModal } from "@/hooks/use-sheet";

const FormSchema = z.object({
  meetingTypeId: z
    .string({
      required_error: "Please select a meeting type",
    })
    .min(2),
  date: z.date({
    required_error: "A Date is required",
  }),
  minutes: z.string().optional(),
});

export function NewMeeting() {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const meetingModal = useMeetingModal();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      meetingTypeId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await apiClient
        .post("/meeting", {
          meetingTypeId: data.meetingTypeId,
          date: data.date,
          minutes: data.minutes,
        })
        .then((res) => {
          toast({
            description: `Successfully created meeting`,
            variant: "success",
          });
          router.refresh();
          meetingModal.onClose();
        });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.s",
        variant: "destructive",
        description: "There was a problem with your request",
        action: <ToastAction altText="Try Again">Try again</ToastAction>,
      });
    }
  }

  useEffect(() => {
    apiClient.get("/meeting-types").then((res) => setMeetingTypes(res.data));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="meetingTypeId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Meeting Type</FormLabel>
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
                        ? meetingTypes.find(
                            (meetingType) => meetingType.id === field.value,
                          )?.name
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {meetingTypes.map((meetingType) => (
                          <CommandItem
                            value={meetingType.name}
                            key={meetingType.id}
                            onSelect={() => {
                              form.setValue("meetingTypeId", meetingType.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                meetingType.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {meetingType.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*  Date*/}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Meeting Date</FormLabel>
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
              <FormDescription>Your meeting date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Budget 2024..." {...field} />
              </FormControl>
              <FormDescription>
                A Short Description about meeting
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Meeting</Button>
      </form>
    </Form>
  );
}
