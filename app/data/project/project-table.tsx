"use client"

import { DataTable } from "@/components/data-table";
import { columns } from "@/components/projects/columns";
import { File, Project, Task, User } from "@/lib/generated/prisma";

interface TaskProps extends Task {
  assignedTo: User;
  project: Project;
  attachments: File[];
  name: string;
}

export const ProjectTable = ({ tasks }: { tasks: TaskProps[] }) => {
  return <DataTable columns={columns} data={tasks as any} />;
};
