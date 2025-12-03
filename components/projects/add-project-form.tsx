"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { projectSchema } from "@/lib/schema";
import { WorkspaceMembersProps } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface Props{
    workspaceMembers: WorkspaceMembersProps[];
}
type ProjectDataType = z.infer<typeof projectSchema>;

export const CreateProjectForm = ({workspaceMembers}:Props) => {
    const workspaceId = useWorkspaceId();
    const [pending, setPending] = useState(false);
    const form = useForm<ProjectDataType>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            memberAccess: [],
            workspaceId: workspaceId as string,            
        }
    })
    const handleSubmit = async(data:ProjectDataType) =>{

    }
    return <>
    <Dialog>
        <DialogTrigger asChild>
            <Button size={"icon"} className="size-5">
                <Plus/>
            </Button>
        </DialogTrigger>
    </Dialog></>
}