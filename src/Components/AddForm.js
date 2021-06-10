import React from 'react'
import ReactDom from 'react-dom'
import AddTask from "./AddTask";

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

export default function addForm({ open, children, onClose, addTaskHandler }) {

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
          <AddTask addTaskHandler={addTaskHandler}></AddTask>
        </div>
        <div className="mt-4">
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
