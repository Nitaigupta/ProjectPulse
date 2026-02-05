"use server";

import { CreateWorkspaceDataType } from "@/components/workspace/create-workspace-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { workspaceSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { generateInviteCode } from "@/utils/get-invite-code";
import { success } from "zod";
import { AccessLevel } from "@/lib/generated/prisma";
import { redirect } from "next/dist/server/api-utils";
import { RedirectType } from "next/navigation";

export const createNewWorkspace = async (data: CreateWorkspaceDataType) => {
  try {
    const { user } = await userRequired();
    const validateData = workspaceSchema.parse(data);
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const res = await db.workspace.create({
      data: {
        name: validateData.name,
        description: validateData.description,
        ownerId: user?.id,
        inviteCode: generateInviteCode(),
        members: {
          create: {
            userId: user.id,
            accessLevel: "OWNER",
          },
        },
      },
    });
    return { data: res };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: "An error occurred while creating the workspace",
    };
  }
};

export const updateWorkspace = async (
  workspaceId: string,
  data: CreateWorkspaceDataType,
) => {
  const { user } = await userRequired();

  const validateData = workspaceSchema.parse(data);

  const isUserAMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id || "",
        workspaceId: workspaceId,
      },
    },
  });

  if (!isUserAMember) {
    throw new Error("You are not a member of this workspace");
  }

  await db.workspace.update({
    where: { id: workspaceId },
    data: {
      name: validateData.name,
      description: validateData.description || "",
    },
  });

  return { success: true };
};

export const resetWorkspaceInviteCode = async (workspaceId: string) => {
  const { user } = await userRequired();

  const isUserAMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id || "",
        workspaceId: workspaceId,
      },
    },
  });

  if (!isUserAMember) {
    throw new Error("You are not a member of this workspace");
  }

  await db.workspace.update({
    where: { id: workspaceId },
    data: {
      inviteCode: generateInviteCode(),
    },
  });
};

export const deleteWorkspace = async (workspaceId: string) => {
  const { user } = await userRequired();

  const isUserAMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id || "",
        workspaceId: workspaceId,
      },
    },
  });

  if (!isUserAMember) {
    throw new Error("You are not a member of this workspace");
  }

  if (isUserAMember && isUserAMember.accessLevel != AccessLevel.OWNER) {
    throw new Error("only the owner can delete a workspace");
  }

  await db.workspace.delete({
    where: {
      id: workspaceId,
    },
  });

  return { success: true };
};
