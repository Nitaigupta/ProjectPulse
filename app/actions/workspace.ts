"use server";

import { CreateWorkspaceDataType } from "@/components/workspace/create-workspace-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { workspaceSchema } from "@/lib/schema";
import {db} from "@/lib/db";
import{generateInviteCode} from "@/utils/get-invite-code"
import { success } from "zod";

export const createNewWorkspace = async (data:CreateWorkspaceDataType) =>{
    try{
        const {user} = await userRequired();
        const validateData = workspaceSchema.parse(data);
        if (!user) {
            throw new Error("User is not authenticated")
        }

        const res =   await db.workspace.create({
            data:{
                name:validateData.name,
                description:validateData.description,
                ownerId:user?.id,
                inviteCode:generateInviteCode(),
                members:{
                    create:{
                        userId: user.id,
                        accessLevel: "OWNER",

                    }
                }
            }

        });
        return {data:res}

    }
    catch(error){
        console.log(error)
        return{
            status:500,
            error:"An error occurred while creating the workspace"
        
        }

    }
}

