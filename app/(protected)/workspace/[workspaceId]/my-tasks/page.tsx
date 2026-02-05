import { userRequired } from "@/app/data/user/is-user-authenticated";
import { getMyTasks } from "@/app/data/task/get-my-tasks";
import React from "react";
import { MyTaskTable, TaskProps } from "@/app/data/project/project-table";

const page = async () => {
  await userRequired();
  const tasks = await getMyTasks();
  return (
    <div>
      <MyTaskTable tasks={tasks as unknown as TaskProps[]} />
    </div>
  );
};

export default page;
