import { CommentProps, ProjectProps } from "@/utils/types"
import {Activity, Task} from "@/lib/generated/prisma"
import { ProjectHeader } from "./project-header"
import { Card } from "../ui/card";
interface ProjectDashboardProps {
    project:ProjectProps;
    tasks:{
        completed:number;
        inProgress:number;
        overdue:number;
        total:number;
        items:Task[];

    };
    activities:Activity[];
    totalWorkspaceMembers:number;
    comments:CommentProps[];
}

export const ProjectDashboard = ({project,tasks,activities,totalWorkspaceMembers,comments}:ProjectDashboardProps) => {
    return <>
    <div className="flex flec-col gap-6 px-2 md:px-4 2xl:px-6 py-0">
        <ProjectHeader project={project as unknown as ProjectProps}/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cold-3 gap-3">

            {/* <Card></Card>
            <div className="grid grid-cols-1 md:grid-cold-2 lg:grid-cold-3 gap-4">
                <TaskDistributionChart/>
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <ActivityFeed/>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Recent Comments</h3>
                    <CommentsList/>
                </Card>
            </div> */}
        </div>

    </div>
    </>
}
 