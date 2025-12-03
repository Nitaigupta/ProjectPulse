"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceProps } from "@/utils/types";
import { Check, ChevronsUpDown, Sidebar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
        (workspace) => workspace.workspaceId === workspaceId
      );
      setSelectedWorkspace(workspace);
    }
  }, [workspaceId, workspaces]);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <WorkspaceAvatar
                  name={(selectedWorkspace?.workspace?.name as string) || "W"}
                />
                <div className="font-semibold text-muted-foreground">
                  {selectedWorkspace?.workspace.name}
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                sideOffset={4}
                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)]"
            >
              {workspaces?.map((workspace) => (
                <DropdownMenuItem
                  className="w-full flex items-center gap-2"
                  key={workspace.id as string}
                  onSelect={() => onSelect(workspace.workspaceId)}
                >
                  <div className="flex flex-row items-center gap-2">
                    <WorkspaceAvatar
                      name={(workspace?.workspace?.name as string) || "W"}
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
