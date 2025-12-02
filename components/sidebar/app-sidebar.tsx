import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";
import { User } from "../../lib/generated/prisma";
import { AppSidebarDataProps } from "./app-sidebar-container";

export const AppSidebar = (
  {}: {
    data: AppSidebarDataProps;
    projects: ProjectProps;
    workspaceMembers: WorkspaceMembersProps[];
    user: User;
  }
) => {
  return <></>;
};
