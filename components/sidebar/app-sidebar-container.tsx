import { getWorkspaceProjectsByWorkspaceId } from "@/app/data/get-workspace-project";
import { getUserById } from "@/app/data/user/get-user";
import { AccessLevel, User } from "../../lib/generated/prisma";
import { get } from "http";
import { AppSidebar } from "./app-sidebar";

export interface AppSidebarDataProps extends User {
  workspaces: {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    acessLevel: AccessLevel;
    workspace: {
      name: string;
    };
  }[];
}

export const AppSidebarContainer = async ({data, workspaceId}:{data:AppSidebarDataProps,workspaceId:string}) => {
    const {projects,workspaceMembers} = await getWorkspaceProjectsByWorkspaceId(workspaceId);
    const user = await getUserById();
    return <AppSidebar
    data={data}
    projects={projects!}
    workspaceMembers={workspaceMembers!}
    user={user as User}
    
    />
};
