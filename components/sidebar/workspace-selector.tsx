"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceProps } from "@/utils/types";
import { Check, Sidebar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export const WorkspaceSelector = ({
  workspaces,
}: {
  workspaces: WorkspaceProps[];
}) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    WorkspaceProps | undefined
  >(undefined);

  const onSelect = (id: string) => {
    setSelectedWorkspace(workspaces.find((workspace) => workspace.id === id));
    router.push(`/workspace/${id}`);
  };
  useEffect(() => {
    if (workspaceId && workspaces) {
      const workspace = workspaces.find(
        (workspace) => workspace.id === workspaceId
      );
      setSelectedWorkspace(workspace);
    }
  }, [workspaceId, workspaces]);

  console.log(workspaces);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <WorkspaceAvatar
                  name={(selectedWorkspace?.workspace?.name as string) || "w"}
                />
                <div className="font-semibold">
                  {selectedWorkspace?.workspace.name}
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width]"
            >
              {workspaces?.map((workspace) => (
                <DropdownMenuItem key={workspace.id as string}>
                  <div>
                    <WorkspaceAvatar
                      name={(workspace?.workspace?.name as string) || "w"}
                    />
                    <p>{workspace?.workspace?.name}</p>
                  </div>
                  {workspace.workspaceId === workspaceId && (
                    <Check className="ml-auto" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};
