import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated"

export const getTaskById= async(
    taskId:string,
    workspaceId:string,
    projectId:string,
)=>{
   
    const {user}=await userRequired();
    if(user===null){
        throw new Error("User is null...")
    }
    const isUserMemeber=await db.workspaceMember.findUnique({
        where:{
            userId_workspaceId:{
                userId:user.id,
                workspaceId,
            },
        }
    });
    if(!isUserMemeber) throw new Error("You are not a of this workspace");
    const projectAccess=await db.projectAccess.findUnique({
        where:{
            workspaceMemberId_projectId:{
                workspaceMemberId:isUserMemeber.id,
                projectId,
            }
        },
    });

    if(!projectAccess){
        throw new Error("You are not allowed to view this project");
    }

    const [task,comments]=await Promise.all([
        db.task.findUnique({
            where:{id:taskId},
            include:{
               assignedTo:{select:{id:true,name:true,image:true}},
               attachments:{select:{id:true,name:true,url:true}},
               project:{
                include:{
                    projectAccess:{
                        include:{
                            workspaceMember:{
                                include:{
                                    user:{
                                        select:{id:true,name:true,image:true},
                                    },
                                }
                            }
                        }
                    }
                }
               }
            },
        }),
        db.comment.findMany({
            where:{projectId},
            include:{user:{select:{id:true,name:true,image:true}}},
            orderBy:{createdAt:"asc"},
        })
    ]);

    const project={
        ...task?.project,
        members:task?.project.projectAccess.map((access)=>access.workspaceMember)
    }
    
    return {
        task:{...task,project},
        comments,
    }
};