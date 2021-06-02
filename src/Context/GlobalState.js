import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State



const initialState = {
  users: [
    {name:'TASK 1', status:'Pending', date:'0000/00/00'},
    {name:'TASK 2', status:'Pending', date:'0000/00/00'},
    {name:'TASK 3', status:'Pending', date:'0000/00/00'},
    {name:'TASK 4', status:'Pending', date:'0000/00/00'},
    {name:'TASK 5', status:'Pending', date:'0000/00/00'}
  ]
}



// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const removeUser = (id) => {
    dispatch({
      type: 'REMOVE_USER',
      payload: id
    })
  }

  const addUser = (user) => {
    dispatch({
      type: 'ADD_USER',
      payload: user
    })
  }

  const editUser = (user) => {
    dispatch({
      type: 'EDIT_USER',
      payload: user
    })
  }

  return (
    <GlobalContext.Provider value={{
      users: state.users,
      removeUser,
      addUser,
      editUser
    }}>
      {children}
    </GlobalContext.Provider>
  )
}