import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Modal from 'react-modal'
import api from "./api/tasks.js"
import { v4 as uuidv4 } from 'uuid';
import TaskList from "./Components/TaskList";
import TaskDetail from "./Components/TaskDetail";
import EditTask from "./Components/EditTask";
Modal.setAppElement('#root')


function App() {
  // const LOCAL_STORAGE_KEY = "tasks";
  const [open, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const addTaskHandler = async (task) => {
    console.log(task);
    const request = {
      id: uuidv4(),
      ...task,
    };

    const response = await api.post("/task", request);
    console.log(response);
    setTasks([...tasks, response.data]);
  };

  //search
  const searchHandler = (searchTerm, filterTerm) => {
    setSearchTerm(searchTerm);
    setFilterTerm(filterTerm)
    if (searchTerm.length > 1) {
      if (filterTerm === "") {
        const newTaskList = tasks.filter((task) => {
          // return Object.values(task).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
          return task["name"].toLowerCase().includes(searchTerm.toLowerCase())
            || task["date"].toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(newTaskList);
        console.log("test:", newTaskList);
        console.log("term:", searchTerm);
        console.log("empty filter box");
      } else {
        const newTaskList = tasks.filter((task) => {
          return task["name"].toLowerCase().includes(searchTerm.toLowerCase())
            || task["date"].toLowerCase().includes(searchTerm.toLowerCase());
        });

        setSearchResults(newTaskList);
        console.log("test:", newTaskList);
        console.log("both");
      }
    } else if (filterTerm.length > 1 && searchTerm === "") {
      const newTaskList = tasks.filter((task) => {
        return task["status"].toLowerCase().includes(filterTerm.toLowerCase())
      });
      setSearchResults(newTaskList);
      console.log("hello this is filter box only");
    } else {
      setSearchResults(tasks);
      console.log("failed or def value");
    }
  }

  //Retrievetasks
  const retrieveTasks = async () => {
    const response = await api.get("/task");
    return response.data;
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
      setSearchResults(allTasks)
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

        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <TaskList
                  {...props}
                  //search
                  term={searchTerm}
                  term2={filterTerm}
                  tasks={searchResults}
                  searchKeyword={searchHandler}

                  //delete task
                  getTaskId={removeTasksHandler}

                  //add task
                  addTaskHandler={addTaskHandler}
                  addtask={tasks}

                  //update
                  updateTasksHandler={updateTasksHandler}

                />
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

      </div>

    </div>
  );
}

export default App;
