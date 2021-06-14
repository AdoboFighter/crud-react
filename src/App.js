import './App.css';
import React,{useContext} from "react";
import Modal from 'react-modal'
import TaskList from "./Components/TaskList";
import { TaskProvider } from './Context/GlobalState'
Modal.setAppElement('#root')


function App() {
  return (
    <TaskProvider>
      <div className="container flex mx-auto w-full items-center justify-center">
        <div className="bg-gray-300 p-4 mt-5 rounded-md mx-auto w-full items-center justify-center">
          <div className="mb-3">
            <p className="font-medium p-2 flex justify-center text-center text-3xl">Calendar App</p>
          </div>
          <TaskList 
              //search
              // term={searchTerm}
              // term2={filterTerm}
              // tasks={searchResults}
              // searchKeyword={searchHandler}
          />

        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
