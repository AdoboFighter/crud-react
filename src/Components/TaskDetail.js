import React from "react";
import { Link } from "react-router-dom";


const TaskDetail = (props) => {
  const { id, name, date } = props.location.state.task;
  return (
    <div className="main">
      <div className="content">
        <div className="header">ID: {id}</div>
        <div className="header">NAME: {name}</div>
        <div className="description">DATE: {date}</div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TaskDetail;
