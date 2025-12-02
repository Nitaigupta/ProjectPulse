import { AccessLevel, Workspace } from "@/lib/generated/prisma/client";

export interface WorkspaceMembersProps extends Workspace {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  projectAccess: {
    id: string;
    hasAccess: boolean;
    projectId: string;
  }[];
}

export interface ProjectProps {
    id: string;
    name:string;
    description ?: string | null;
    workspaceId:string;
    members:{
        is:string,
        userId:string,
        workspaceId:string,
        accessLevel: AccessLevel;
        createdAt: Date,
        user:{
            id:string;
            name:string;
            string:string;
            email:string;
            image:string;
        }
    }[];
};
