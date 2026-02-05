"use client";
import { $Enums, Workspace } from "@/lib/generated/prisma";
import { workspaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { use } from "react";
import { useForm } from "react-hook-form";
import z, { email, success } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CreateWorkspaceDataType } from "./create-workspace-form";
import { toast } from "sonner";
import {
  deleteWorkspace,
  resetWorkspaceInviteCode,
  updateWorkspace,
} from "@/app/actions/workspace";
import error from "next/error";
import { Link, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfirmation } from "@/hooks/use-delete";
import { ConfirmationDialog } from "./confirmation-dialog";

interface DataProps extends Workspace {
  members: {
    userId: string;
    acessLevel: $Enums.AccessLevel;
  }[];
}

export const WorkspaceSettingsForm = ({ data }: { data: DataProps }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const { isOpen, confirm, handleConfirm, handleCancel, confirmationOptions } =
    useConfirmation();

  const [inviteEmail, setInviteEmail] = React.useState<string>("");
  const form = useForm<CreateWorkspaceDataType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: data.name,
      description: data.description || "",
    },
  });

  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/workspace/${data.id}/join/${data.inviteCode}`;

  const handleonSubmit = async (values: CreateWorkspaceDataType) => {
    try {
      setIsPending(true);
      await updateWorkspace(data.id, values);
      toast.success("Your workspace has been updated successfully!");
    } catch (error) {
      if (error instanceof Error && error.message != "NEXT_REDIRECT") {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsPending(false);
    }
  };
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard!");
  };
  const handleResetInvite = async () => {
    try {
      setIsPending(true);
      await resetWorkspaceInviteCode(data.id);
      toast.success("Invite code reset successfully!");
    } catch (error) {
      if (error instanceof Error && error.message != "NEXT_REDIRECT") {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsPending(false);
    }
  };
  const handleDelete = () => {
    confirm({
      title: "Delete Workspace",
      message: "Are you sure you want to delete this workspace?",
      onConfirm: async () => {
        try {
          setIsPending(true);
          // Simulate deletion action (replace with actual deletion logic)
          toast.success("Workspace deleted successfully!");
          await deleteWorkspace(data.id);
        } catch (error) {
          if (error instanceof Error && error.message != "NEXT_REDIRECT") {
            toast.error(
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.",
            );
          }
        } finally {
          setIsPending(false);
        }
      },
    });
  };

  return (
    <div className="p-3 md:p-6 max-w-4xl w-full mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg font-semibold">
            Workspace Settings
          </CardTitle>
          <CardDescription>Manage your workspace settings</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleonSubmit)}
              className="space-y-4"
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

              <div className="flex flex-row items-center gap-4 justify-end">
                <Button type="submit" disabled={isPending} className="">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg font-semibold">
            Invite Members
          </CardTitle>
          <CardDescription>Invite members to your workspace</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Enter email address"
              value={inviteEmail}
              readOnly
            />

            <Button
              type="button"
              disabled={isPending}
              className=""
              onClick={() => handleResetInvite()}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Enter email address"
              value={inviteLink}
              readOnly
            />
            <div className="flex items-center justify-end mt-4 gap-2">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => copyInviteLink()}
              >
                <Link className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                disabled={isPending}
                className=""
                onClick={() => handleResetInvite()}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Delete your entire workspace</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            type="button"
            variant={"destructive"}
            className=""
            onClick={handleDelete}
          >
            Delete Workspace
          </Button>
        </CardContent>
      </Card>
      <ConfirmationDialog
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={confirmationOptions?.title || "Confirm Action"}
        message={
          confirmationOptions?.message || "Are you sure you want to proceed?"
        }
      />
    </div>
  );
};
