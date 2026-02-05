import { userRequired } from "../user/is-user-authenticated";
import { db } from "@/lib/db";

export const getWorkspaceById = async (workspaceId: string) => {
  const { user } = await userRequired();

  if (!user?.id) {
    throw new Error("User ID is required");
  }

  const isUserMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id,
        workspaceId,
      },
    },
  });

  if (!isUserMember) {
    throw new Error("Unauthorized acesss");
  }

  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      members: { select: { userId: true, accessLevel: true } },
    },
  });

  return { data: workspace };
};
