import React, { useState } from "react";
import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";

const TaskList = (props) => {
  console.log(props);

  const deleteTaskHandler = (id) => {
    props.getTaskId(id);
  };
  const [openTask, setIsOpenTask] = useState(false);
  const renderTaskList = props.tasks.map((task) => {
    return (
      <TaskCard
        task={task}
        clickHander={deleteTaskHandler}
        key={task.id}
      />
    );
  });
  return (
    <div className="main">
      <div className="">{renderTaskList}</div>
    </div>
  );
};

export default TaskList;
