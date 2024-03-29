import React, { useState, useRef, useContext } from 'react'
import { TaskContext } from '../Context/GlobalState'
import TaskCard from "./TaskCard";
import Swal from 'sweetalert2';
import AddForm from "./AddForm";


export default function TaskList() {
  const appContext = useContext(TaskContext)
  const { tasks, removeTasksHandler, addTaskHandler,
    searchResults,
    updateTasksHandler, searchHandler} = appContext

  const [open, setIsOpen] = useState(false)
  const inputE1 = useRef("")
  const inputE2 = useRef("")

  const renderTaskList = searchResults.map(task => {
    return (
      <TaskCard
        task={task}
        clickHander={removeTasksHandler}
        updateTasksHandler={updateTasksHandler}
        key={task.id}
      />
    );
  });

  const renderTaskList2 = tasks.map(task => {
    return (
      <TaskCard
        task={task}
        clickHander={removeTasksHandler}
        updateTasksHandler={updateTasksHandler}
        key={task.id}
      />
    );
  });

  const getSearchTerm = () => {
    searchHandler(inputE1.current.value, inputE2.current.value)


  }

  return (
    <div className="main">
      <div className="mb-3 grid grid-cols-3 gap-4">
        <div>
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center">
              <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </span>
            <input
              id="search1"
              ref={inputE1}
              type="text"
              // value={props.term}
              onChange={getSearchTerm}
              className="py-2 text-sm text-black  rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." />
          </div>
        </div>
        <div></div>
        <div>
          <div className="flex flex-row-reverse">
            <div className="relative inline-block w-full text-gray-700">
              <select
                ref={inputE2}
                type="text"
                // value={props.term2}
                onChange={getSearchTerm}
                className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="">
                <option value="">Filter By Status</option>
                <option value="Pending">Pending</option>
                <option value="On-going">On-going</option>
                <option value="Done">Done</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {renderTaskList.length > 0 ? renderTaskList : renderTaskList2}
      </div>

      <div className="mt-2 flex flex-row-reverse">
        <button type="button" onClick={() => setIsOpen(true)} className="focus:outline-none  text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex-row-reverse">Add Task</button>
      </div>

      <AddForm open={open} onClose={() => setIsOpen(false)}  addTaskHandler={addTaskHandler}/>


    </div>
  )
}
