import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Modal from 'react-modal'
import api from "./api/tasks.js"
import { v4 as uuidv4 } from 'uuid';
import AddTasks from "./Components/AddTask";
import TaskList from "./Components/TaskList";
import TaskDetail from "./Components/TaskDetail";
import EditTask from "./Components/EditTask";
import AddForm from "./Components/AddForm";
Modal.setAppElement('#root')


function App() {
  // const LOCAL_STORAGE_KEY = "tasks";
  const [open, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  //Retrievetasks
  const retrieveTasks = async () => {
    const response = await api.get("/task");
    return response.data;
  };

  const addTaskHandler = async (task) => {
    console.log(task);
    const request = {
      id: uuidv4(),
      ...task,
    };

    const response = await api.post("/task", request);
    console.log(response);
    setTasks([...tasks, response.data]);
    setIsOpen(false)
  };

  const updateTasksHandler = async (task) => {
    const response = await api.put(`/task/${task.id}`, task);
    const { id, name, date, status } = response.data;
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...response.data } : task;
      })
    );
  };

  const removeTasksHandler = async (id) => {
    await api.delete(`/task/${id}`);
    const newTaskList = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(newTaskList);
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllTasks = async () => {
      const allTasks = await retrieveTasks();
      if (allTasks) setTasks(allTasks);
    };

    getAllTasks();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(task));
  }, [tasks]);


  return (
    <div className="container flex mx-auto w-full items-center justify-center">
      <div className="bg-gray-300 p-4 mt-5 rounded-md mx-auto w-full items-center justify-center">
        <div className="mb-3">
          <p className="font-medium p-2 flex justify-center text-center text-3xl">Calendar App</p>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-4">
          <div>
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
              </span>
              <input type="search" name="q" className="py-2 text-sm text-white  rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autoComplete="off" />
            </div>
          </div>
          <div></div>
          <div>
            <div className="flex flex-row-reverse">
              <div class="relative inline-block w-full text-gray-700">
                <select class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="">
                  <option>Filter By Status</option>
                  <option>Pending</option>
                  <option>Done</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <TaskList
                  {...props}
                  tasks={tasks}
                  getTaskId={removeTasksHandler}
                />
              )}
            />
            <Route
              path="/add"
              render={(props) => (
                <AddTasks {...props} addTaskHandler={addTaskHandler} />
              )}
            />

            <Route
              path="/edit"
              render={(props) => (
                <EditTask
                  {...props}
                  updateTasksHandler={updateTasksHandler}
                />
              )}
            />

            <Route path="/task/:id" component={TaskDetail} />

          </Switch>
        </Router>

        <AddForm open={open} onClose={() => setIsOpen(false)} addTaskHandler={addTaskHandler} >

        </AddForm>

        <div className="mt-2 flex flex-row-reverse">
          <button type="button" onClick={() => setIsOpen(true)} className="focus:outline-none  text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex-row-reverse">Add Task</button>
        </div>

      </div>

    </div>
  );
}

export default App;
