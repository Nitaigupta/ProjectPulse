import { getWorkspaceProjectsByWorkspaceId } from "@/app/data/project/get-workspace-projects";
import { getWorkspaceById } from "@/app/data/workspace/get-workspaces";
import { WorkspaceSettingsForm } from "@/components/workspace/workspace-setting-from";
import React from "react";

const WorkspaceSettings = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;
  const { data } = await getWorkspaceById(workspaceId);
  return (
    <div>
      <WorkspaceSettingsForm data={data as any} />
    </div>
  );
};

export default WorkspaceSettings;
