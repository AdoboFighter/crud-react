import React, { useState, useEffect } from 'react'
import api from "../api/tasks.js"
import { v4 as uuidv4 } from 'uuid';

const TaskContext = React.createContext()

const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const retrieveTasks = async () => {
    try {
      const response = await api.get("/task");
      return response.data;
    } catch (error) {
      if (error) {
        console.log(error.message, 'Try updating the API key in App.js')
      }
    }
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
  }, [tasks])


  return (
    <TaskContext.Provider value={{
      tasks,
      searchTerm,
      filterTerm,
      searchResults,
      removeTasksHandler,
      updateTasksHandler,
      addTaskHandler,
      searchHandler
    }}>
      {props.children}
    </TaskContext.Provider>
  )
}
const TaskConsumer = TaskContext.Consumer
export { TaskContext, TaskConsumer, TaskProvider }