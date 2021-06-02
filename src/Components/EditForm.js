import React from 'react'
import ReactDom from 'react-dom'
import EditTask from "./EditTask";

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

export default function editForm({ open, children, onClose,  updateTasksHandler, to }) {

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
          {/* <EditTask to={to} updateTasksHandler={ updateTasksHandler}> hello</EditTask> */}
        </div>

        <div className="mt-4">

        </div>

        {/* <div className="mb-3 grid grid-cols-3 gap-4">
          <div>
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <button onClick={onClose} className="py-2">Close</button>
              {children}
            </div>
          </div>
          <div></div>
          <div>
            <div className="flex flex-row-reverse">
              <button type="button" className="focus:outline-none  text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex-row-reverse">Add</button>
            </div>
          </div>
        </div> */}

      </div>
    </>,
    document.getElementById('portal')
  )
}
