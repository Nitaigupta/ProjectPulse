"use server";

import { ProjectDataType } from "@/components/projects/create-project-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/schema";

export const createNewProject = async (data: ProjectDataType) => {
  const { user } = await userRequired();
  if(!user){
    throw new Error("User not authenticated")
  }
  if(!data.workspaceId){
    throw new Error("Workspace Id is required")
  }
  const workspace = await db.workspace.findUnique({
    where: { id: data?.workspaceId },
    include: {
      projects: {
        select: { id: true },
      },
    },
  });

  const validatedData = projectSchema.parse(data);
  const workspaceMemberMembers = await db.workspaceMember.findMany({
    where: {
      workspaceId: data.workspaceId,
    },
  });

  const isUserMember = workspaceMemberMembers.some(
    (member) => member.userId === user.id
  );
  if (!isUserMember) {
    throw new Error("Unauthorized to create project in this workspace.");
  }

  if (!validatedData.memberAccess || validatedData.memberAccess?.length === 0) {
    validatedData.memberAccess = [user.id];
  } else if (!validatedData.memberAccess?.includes(user.id)) {
    validatedData?.memberAccess?.push(user.id);
  }

  const projectAccessData = validatedData.memberAccess.map((memberId) =>{
    const workspaceMember=workspaceMemberMembers.find((member) => member.userId === memberId)
    if(!workspaceMember) return null;

    return {
        workspaceMemberId: workspaceMember.id,
        hasAccess: true
    }
  }).filter((item): item is { workspaceMemberId: string; hasAccess: boolean } =>
        item !== null)

  const project = await db.project.create({
    data: {
      name: validatedData.name,
      description: validatedData.description || "",
      workspaceId: validatedData.workspaceId || "",
      projectAccess: {
        create: projectAccessData,
      },
      activities: {
        create: {
          type: "Project_Created",
          description: `Created project ${validatedData.name}`,
          userId: user.id,
        },
      },
    },
  });
  return { success: true, data: project };
};

export const postComment= async(
  workspaceId:string,
  projectId:string,

  content:string
)=>{
  const {user}=await userRequired();
  if(user===null){
    throw new Error("User is null");
    
  }
  const isMemeber=await db.workspaceMember.findUnique({
    where:{
      userId_workspaceId:{
        userId:user.id,
        workspaceId,

      }
    }
  });

  if(!isMemeber){
    throw new Error("You are not a member of this workspace");
  }

  const projectAccess=await db.projectAccess.findUnique({
    where:{
      workspaceMemberId_projectId:{
        workspaceMemberId:isMemeber.id,
        projectId,
      }
    }
  });

  if(!projectAccess){
    throw new Error("You do not have access to this project");
  }

  const comment=await db.comment.create({
    data:{
      content,projectId,userId:user.id,
    }
  });
  return comment;
}