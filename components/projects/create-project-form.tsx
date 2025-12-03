"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { projectSchema } from "@/lib/schema";
import { WorkspaceMembersProps } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface Props {
  workspaceMembers: WorkspaceMembersProps[];
}
type ProjectDataType = z.infer<typeof projectSchema>;

export const CreateProjectForm = ({ workspaceMembers }: Props) => {
  const workspaceId = useWorkspaceId();
  const [pending, setPending] = useState(false);
  const form = useForm<ProjectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      memberAccess: [],
      workspaceId: workspaceId as string,
    },
  });
  const handleSubmit = async (data: ProjectDataType) => {};
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} className="size-5">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Card className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>
                Create New Project
              </DialogTitle>
            </DialogHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter workspace name"
                            {...field}
                          />
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
                    <Button
                      type="button"
                      variant={"outline"}
                      disabled={pending}
                    >
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
        </DialogContent>
      </Dialog>
    </>
  );
};
