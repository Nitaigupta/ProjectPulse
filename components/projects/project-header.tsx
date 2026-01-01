import { ProjectProps } from "@/utils/types"
import { ProjectAvatar } from "@/components/projects/project-avatar"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { AvatarImage } from "../ui/avatar"
import { Card } from "../ui/card"
import { CreateTaskDialog } from "@/components/task/create-task-dialog"

export const ProjectHeader=({project}:{project:ProjectProps})=>{
    return (
    <div className="w-full space-y-4">
         <div className="flex  flex-col md:flex-row md:items-center justify-between gap-2">

            <div className="flex gap-2">
                <ProjectAvatar name={project.name} className={""}/>
                <div>
                <h1 className="text-xl 2xl:text-2xl font-bold">{project?.name}</h1>
                {
                    project?.description && (<p className="text-sm text-gray-600">{project?.description}</p>)
                }
                </div>
            </div>

            <div className="flex justify-end mt-3 md :mt-0 gap-3">
                <CreateTaskDialog project={project}></CreateTaskDialog >
            </div>

        </div>

        <Card className="p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h3 className="text-sm font medium">Team Members</h3>
                
                <div className="flex flex-wrap space-x-2">
                    {
                        project?.members?.map((member)=>(
                            <Avatar
                            key={member.user.id} 
                            className="size-9 2xl:size-10 border-2 border-background shadow-color"
                            >
                                <AvatarImage src={member?.user.image || undefined} className="w-6 2xl:w-8 h-6 2xl:h-8 rounded-md"/>
                                <AvatarFallback className="w-6 2xl:w-8 h-6 2xl:h-8 bg-gray-200 text-gray-600 font-medium flex items-center justify-center rounded-md">
                                    {member?.user.name.substring(0,2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        ))
                    }
                </div>

            </div>
        </Card>
    </div>
   )
}