import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";
import { User } from "../../lib/generated/prisma";
import { AppSidebarDataProps } from "./app-sidebar-container";
import {
  Sidebar,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { WorkspaceSelector } from "./workspace-selector";

export const AppSidebar = ({
  data,
  projects,
  workspaceMembers,
  user,
}: {
  data: AppSidebarDataProps;
  projects: ProjectProps[];
  workspaceMembers: WorkspaceMembersProps[];
  user: User;
}) => {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="bg-background">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                className=" w-10 h-10 
        text-white 
        text-sm font-medium 
        flex items-center justify-center 
        rounded-md"
                src={"/wrench.svg"}
              />
            </Avatar>
            <SidebarGroupLabel>
              <span className="text-xl font-bold">ProjectPulse</span>
            </SidebarGroupLabel>
          </div>
          <div className="flex justify-between mb-0">
            <SidebarGroupLabel className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
              Workspace
            </SidebarGroupLabel>
            <Button asChild size={"icon"} className="size-5">
              <Link href="/create-workspace">
                <Plus />
              </Link>
            </Button>
          </div>
          <WorkspaceSelector workspaces={data.workspaces} />
        </SidebarHeader>
      </Sidebar>
    </>
  );
};
