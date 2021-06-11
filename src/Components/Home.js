import React, { useState } from "react"
import  TaskList  from './TaskList'


export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <><div className="container flex mx-auto w-full items-center justify-center">

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

          <TaskList />
  
  

  
       
        </div>
        </div>
            
        </>
    )
}
