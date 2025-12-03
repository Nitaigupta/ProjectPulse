import { getWorkspaceProjectsByWorkspaceId } from "@/app/data/get-workspace-project";
import { getUserById } from "@/app/data/user/get-user";
import { AccessLevel, User } from "../../lib/generated/prisma";
import { get } from "http";
import { AppSidebar } from "./app-sidebar";
import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";

export interface AppSidebarDataProps extends User {
  workspaces: {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    accessLevel: AccessLevel;
    workspace: {
      name: string;
    };
  }[];
}

export const AppSidebarContainer = async ({
  data,
  workspaceId,
}: {
  data: AppSidebarDataProps;
  workspaceId: string;
}) => {
  const { projects, workspaceMembers } =
    await getWorkspaceProjectsByWorkspaceId(workspaceId);
  const user = await getUserById();
  return (
    <AppSidebar
      data={data}
      projects={projects as unknown as ProjectProps[]}
      workspaceMembers={workspaceMembers as unknown as WorkspaceMembersProps[]}
      user={user as User}
    />
  );
};
