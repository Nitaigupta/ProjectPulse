"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { projectSchema } from "@/lib/schema";
import { WorkspaceMembersProps } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { createNewProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";

interface Props {
  workspaceMembers: WorkspaceMembersProps[];
}
export type ProjectDataType = z.infer<typeof projectSchema>;

export const CreateProjectForm = ({ workspaceMembers }: Props) => {
  const workspaceId = useWorkspaceId();
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const form = useForm<ProjectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      memberAccess: [],
      workspaceId: workspaceId as string,
    },
  });
  const handleSubmit = async (data: ProjectDataType) => {
    try {
      setPending(true);
      await createNewProject(data);
      form.reset()
      toast.success("Project Created Successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };
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
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>

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

                <div>
                  <FormField
                    control={form.control}
                    name="memberAccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Access</FormLabel>
                        <FormDescription className="text-xs text-muted-foreground mb-4">
                          Select which workspace members should have access to
                          this project
                        </FormDescription>
                        <div>
                          {workspaceMembers?.map((member) => (
                            <div
                              key={member.userId}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={member.userId}
                                checked={field.value?.includes(member.userId)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  if (checked) {
                                    field.onChange([
                                      ...currentValue,
                                      member.userId,
                                    ]);
                                  } else {
                                    field.onChange(
                                      currentValue.filter(
                                        (id) => id !== member.userId
                                      )
                                    );
                                  }
                                }}
                              />
                              <label
                                htmlFor={member.userId}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                                 peer:disabled:opacity-70 
                                capitalized cursor-pointer"
                              >
                                {member.user.name} (
                                {member.accessLevel.toLowerCase()})
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-row items-center gap-4">
                  <Button type="button" variant={"outline"} disabled={pending}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={pending} className="">
                    Create Project
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};
