import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Swal from 'sweetalert2';


const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '30px',
  zIndex: 1000,

}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function AddForm({ open, children, onClose, addTaskHandler, AddTask }) {

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

   AddTask = {
     name,
     date,
     status
  };
  


  const add = (e) => {
    e.preventDefault();
    if (AddTask.name === "" || AddTask.date === "" || AddTask.status === "") {
      Swal.fire({
        icon: 'error',
        title: 'Fill all data',
        text: 'All inputs are mandatory',
      })
      return;
    }
    addTaskHandler(AddTask);
    // AddTask.setState({ name: "", date: "", status: "" });
    console.log(AddTask);
  };

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES} className="rounded-md  w-1/2">
        <div>
          <div className="flex flex-row-reverse">
            <button onClick={onClose} className="mb-2">Close</button>
            {children}
          </div>
        </div>
        <div>
          {/* <AddTask addTaskHandler={addTaskHandler}></AddTask> */}
          <h2 className="font-medium flex justify-center text-center text-3xl mb-3">Add Task</h2>

          <form className="ui form" onSubmit={add}>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Task name</label>
              <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Task" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Task Date</label>
              <input type="date" name="date" onChange={(e) => setDate(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Status :</label>
              <select onChange={(e) => setStatus(e.target.value)} name="status"  className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline">
                <option defaultValue="">Choose a status</option>
                <option value="Pending">Pending</option>
                <option value="On-going">On-going</option>
                <option value="Done">Done</option>
              </select>
            </div>
            {/* <button className="ui button blue">Add</button> */}
            <div className="flex flex-row-reverse">
              <button type="submit" className="focus:outline-none  text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex-row-reverse">Add</button>
            </div>

          </form>
        </div>
        <div className="mt-4">
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}