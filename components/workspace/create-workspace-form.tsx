"use client";

import { workspaceSchema } from "@/lib/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { createNewWorkspace } from "@/app/actions/workspace";
import { useRouter } from "next/navigation";

export type CreateWorkspaceDataType = z.infer<typeof workspaceSchema>;

export const CreateWorkspaceForm = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const form = useForm<CreateWorkspaceDataType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateWorkspaceDataType) => {
    try {
      setPending(true);
      const { data: res } = await createNewWorkspace(data);
      toast.success("Workspace created successfully!");
      router.push(`/workspaces/${res?.id as string}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm shadow-md border border-slate-200">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg font-semibold">
            Create New Workspace
          </CardTitle>
          <CardDescription>
            Set up a workspace for yourself and team
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workspace name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Workspace description"
                        className="resize-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row items-center gap-4">
                <Button type="button" variant={"outline"} disabled={pending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={pending} className="">
                  Create Workspace
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
