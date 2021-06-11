import React, { useState } from "react";
import { Link } from "react-router-dom";
import TaskModal from "./TaskModal";



const TaskCard = (props) => {
    const { id, name, date, status } = props.task;
    const [openTask, setIsOpenTask] = useState(false);

  
    
    
    return (
        <>
            <div className="item mb-3 select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="item mb-3 select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center pl-2 pt  transition duration-500">
                    <div className="flex flex-col">
                        <div>{name}</div>
                        <div>{date}</div>
                        <div>{status}</div>
                    </div>

                </div>

                <div className="mt-2 flex flex-row-reverse">

                    <button type="button" onClick={() => props.clickHander(id)} className="focus:outline-none border-black  text-white text-sm py-2.5 px-5 rounded-md bg-white-500 hover:bg-red-600 hover:shadow-lg flex-row-reverse"> <svg className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg></button>

                    {/* <Link to={{ pathname: `/edit`, state: { task: props.task } }}>
                        <button type="button" onClick={() => setIsOpenTask(true)} className="focus:outline-none border-black  text-blue text-sm py-2.5 px-5 rounded-md bg-white-500 hover:bg-blue-600 hover:shadow-lg flex-row-reverse">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>

                    </Link> */}

                    <button type="button" onClick={() => setIsOpenTask(true)} className="focus:outline-none border-black  text-blue text-sm py-2.5 px-5 rounded-md bg-white-500 hover:bg-blue-600 hover:shadow-lg flex-row-reverse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </div>


            </div>

            {/* <i
                className="trash alternate outline icon"
                style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
                onClick={() => props.clickHander(id)}
            ></i> */}

            <TaskModal open={openTask} onClose={() => setIsOpenTask(false)} id={id} name={name} date={date} status={status} updateHandler={props.updateHandler}>
            </TaskModal>
        </>
    );
};

export default TaskCard;