import React from 'react'
import ReactDom from "react-dom";
import Swal from "sweetalert2"

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




export default function TaskModal({ open, children, onClose, name, date, status, id, updateHandler }) {

    const [state, setState] = React.useState({
        id,
        name,
        date,
        status
      })
    
      function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
        console.log(evt.target.value);
        console.log(name)
        console.log("hello");
      }


    const update = (e) => {

        e.preventDefault();
        if (state.name === "" || state.date === "" || state.status === "") {
          alert("ALl the fields are mandatory!");
          return;
        }
        Swal.fire({
          title: 'Do you want to Update this task?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: `Yes`,
          confirmButtonColor: '#5bc0de'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            updateHandler(state);
            // this.setState({ name: "", date: "", status: "" });
            // this.props.history.push("/");
            Swal.fire('Task Updated!', '', 'success')
            onClose();
          } else {
            
            console.log("Do nothing");
          }
        })
      };


    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES} className="rounded-md  w-1/2">
                <div>
                    <div className="flex flex-row-reverse">
                        <button onClick={onClose} className="mb-3">Close</button>
                        {children}
                    </div>
                </div>

                <h2 className="font-medium flex justify-center text-center text-3xl mb-3">Task</h2>
                <div>
                    {/* <EditTask  updateTasksHandler={ updateTasksHandler}> hello</EditTask> */}
                    <div className="mb-3">
                        {/* <p className="font-medium p-2 flex justify-center text-center text-2xl">{id}</p> */}
                        <input hidden readOnly value={id}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Task name</label>
                        <input
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" type="text" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >Date</label>
                        <input 
                            name="date"
                            value={state.date}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" type="date" />
                    </div>

                    <div className="relative inline-block w-full text-gray-700">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                        <div className="relative inline-block w-full text-gray-700">
                            <select
                                name="status"
                                value={state.status}
                                onChange={handleChange}
                                className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" >
                                <option>Pending</option>
                                <option>Done</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">

                </div>

                <div className="mb-3 grid grid-cols-3 gap-4">
                    <div>
                        {/* <div className="relative text-gray-600 focus-within:text-gray-400">
                            <button onClick={onClose} className="py-2">Close</button>
                            {children}
                        </div> */}
                    </div>
                    <div></div>
                    <div>
                        <div className="flex flex-row-reverse">
                            <button onClick={update} type="button" className="focus:outline-none  text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex-row-reverse">Update</button>
                        </div>
                    </div>
                </div>

            </div>
        </>,
        document.getElementById('portal')
    )
}
