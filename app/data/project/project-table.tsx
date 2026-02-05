"use client";

import { DataTable } from "@/components/data-table";
import { columns, myTaskColumns } from "@/components/projects/columns";
import { File, Project, Task, User } from "@/lib/generated/prisma";

export interface TaskProps extends Task {
  assignedTo: User;
  project: Project;
  attachments: File[];
  name: string;
}

export const ProjectTable = ({ tasks }: { tasks: TaskProps[] }) => {
  return <DataTable columns={columns} data={tasks as any} />;
};

export const MyTaskTable = ({ tasks }: { tasks: TaskProps[] }) => {
  return <DataTable columns={myTaskColumns} data={tasks as any} />;
};
