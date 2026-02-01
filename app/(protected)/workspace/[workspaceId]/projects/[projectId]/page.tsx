<<<<<<< Updated upstream
=======
import React from "react";
import Link from "next/link";
import { ProjectDashboard } from "@/components/projects/project-dashboard";
import { getProjectDetails } from "@/app/data/project/get-project-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentProps, ProjectProps, ProjectTaskProps } from "@/utils/types";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectTableContainer } from "@/components/projects/project-table-container";
import { ProjectKanban } from "@/components/projects/project-kanban";
>>>>>>> Stashed changes

import React from 'react'
import Link from 'next/link';
import {ProjectDashboard} from '@/components/projects/project-dashboard';
import { getProjectDetails } from '@/app/data/get-project-details';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommentProps, ProjectProps } from '@/utils/types';
import { ProjectHeader } from '@/components/projects/project-header';

interface ProjectPageProps{
    params :Promise<{workspaceId:string, projectId:string}>;
    searchParams:Promise < {[key:string]:string | string[] | undefined}>;
}

const ProjectPage = async (props:ProjectPageProps) => {
    const {workspaceId, projectId} = await props.params;
    const searchParams= await props.searchParams;

    const {project,tasks,comments,activities,totalWorkspaceMembers}=await getProjectDetails(workspaceId, projectId);

  return (
    <div className='flex flex-col gap-6 pb-3 px-3'>
        <Tabs defaultValue={(searchParams.view as string) || "dashboard"} className='w-full'>
            <TabsList className='mb-4'>
                <Link href="?view=dashboard">
                <TabsTrigger value="dashboard" className="px-1.5 md:px-3">
                    Dashboard
                </TabsTrigger>
                </Link>

                <Link href="?view=table">
                <TabsTrigger value="table" className="px-1.5 md:px-3">
                    Table
                </TabsTrigger>
                </Link>

                    <Link href="?view=kanban">
                    <TabsTrigger value="kanban" className="px-1.5 md:px-3">
                        Kanban
                    </TabsTrigger>
                    </Link>
                </TabsList>

<<<<<<< Updated upstream
                <TabsContent value='dashboard'>
                   Dashboard
                   
                   <ProjectDashboard project={project as unknown as ProjectProps} tasks={tasks as any} 
                   activities={activities!} totalWorkspaceMembers={totalWorkspaceMembers!} comments={comments as unknown as CommentProps[]}
                   /> 
                </TabsContent>
                <TabsContent value="table">
                    <p>Tables</p>
                </TabsContent>
                <TabsContent value="kanban">
                    <p>Kanban</p>
                </TabsContent>
            
        </Tabs>
=======
        <TabsContent value="dashboard">
          <ProjectDashboard
            project={project as unknown as ProjectProps}
            tasks={tasks as any}
            activities={activities!}
            totalWorkspaceMembers={totalWorkspaceMembers!}
            comments={comments as unknown as CommentProps[]}
          />
        </TabsContent>
        <TabsContent value="table">
          <ProjectTableContainer projectId={projectId} />
        </TabsContent>
        <TabsContent value="kanban">
          <ProjectKanban initialTasks={tasks?.items as unknown as ProjectTaskProps[]}/>
          {/* <p>Kanban</p> */}
        </TabsContent>
      </Tabs>
>>>>>>> Stashed changes
    </div>
  )
}

export default ProjectPage