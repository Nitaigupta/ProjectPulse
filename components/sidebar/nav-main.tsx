"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { CheckSquare, LayoutDashboard, Settings, Users } from "lucide-react";
import path from "path";
import Link from "next/link";

export const NavMain = () => {
    const workspaceId=useWorkspaceId();
    const {setOpenMobile} = useSidebar();

    const items = [
        {
            
            label : "Home",
            href : `/workspace/${workspaceId}`,
            icon: LayoutDashboard,
            path: "home"
        },
        {
            label: "My Tasks",
            href: `/workspace/${workspaceId}/my-tasks`,
            icon: CheckSquare,
            path: "my-tasks"
        },
        {
            label: "Members",
            href: `/workspace/${workspaceId}/members`,
            icon: Users,
            path: "members"
        },
        {
            label: "Settings",
            href: `/workspace/${workspaceId}/settings`,
            icon: Settings,
            path: "settings"
        }
    ];

    return<>
        <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu className="space-y-3">
                {items.map(eL=>(
                    <SidebarMenuItem key ={eL.label}>
                        <SidebarMenuButton asChild tooltip={eL.label} className="px-2 py-1.5">
                            <Link href={eL.href} onClick={() => setOpenMobile(false)}>
                            <eL.icon className="mr-2 h-4 w-4"/>
                            {eL.label}</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>))
                }
            </SidebarMenu>
        </SidebarGroup>
    </>;
}