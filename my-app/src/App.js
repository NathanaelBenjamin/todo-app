import React, { useState, useEffect } from 'react';

const App = () => {

  const [ task, setTasks ] = useState("");
  const [ listOfTasks, setListOfTasks ] = useState(() => {
    const savedItems = JSON.parse(localStorage.getItem("listOfTasks"));
    return savedItems || []; 
  });
  const [ numberOfCompletedTasks, setNumberOfCompletedTasks ] = useState([]);
  
  const addTask = (event) => {
    event.preventDefault();
    if(task.title && !listOfTasks.includes(task)){
      setListOfTasks([...listOfTasks, task]);
      setTasks({title: ""});
    }
  }

  useEffect(() => {
    localStorage.setItem("listOfTasks", JSON.stringify(listOfTasks));
  }, [listOfTasks]);
 
  const handleDelete = (item) => {
    listOfTasks && setListOfTasks(prev => {
      return prev.filter(element => {
        return element !== item;
      });
    });
    localStorage.setItem("listOfTasks", JSON.stringify(listOfTasks));
  }

  const handleDone = ({event, item}) => {
    event.target.classList.toggle("fill-blue-500");

    if(numberOfCompletedTasks.includes(item)){
      setNumberOfCompletedTasks((prev) => {
        return prev.filter(element => {
          return element !== item;
        })
      });
    }

    else{
      setNumberOfCompletedTasks([...numberOfCompletedTasks, item]);
    }
  }

  return (
    <div className="container bg-gray-900 flex justify-center py-4">
      <div className='flex flex-col gap-4 items-center text-white w-3/4'>
        <h1 className="text-3xl font-bold ">
          To-do App
        </h1>

        <form className=''
          onSubmit={(event) => {
            addTask(event)
          }}
        >

          <input type="text" 
            className='grow p-2 focus:outline-blue-400'
            value={task.title}
            onChange={(event) => {
              setTasks({title: event.target.value});
            }}
          />

          <button
            className='bg-blue-500 text-gray-100 rounded py-1 px-2 md:px-4 w-28 shrink'
          >
            Add task
          </button>

          {
            <div>
               <p>{numberOfCompletedTasks.length}/{listOfTasks.length}</p>
            </div>
          }
        </form>

        <div className='mx-auto py-8 flex flex-col items-center w-full'>
          <h1 className="font-bold text-2xl py-6">TASKS</h1>

              { 
                    listOfTasks.map(item => {
                    return <li className="list-decimal my-5 bg-white px-6 py-5 rounded text-blue-600 w-10/12 md:w-2/3 max-w-md">
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <div className="text-lg mt-3 font-bold">{item.title}</div>

                      <button className="done-button"
                        onClick = {(event) => {
                          handleDone({event, item})
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-10 fill-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>

                      <button className='delete-button'
                        onClick = {() => {
                          handleDelete(item)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-gray-100" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                })
                
              }
            
        </div>
      </div>
    </div>
  )
}

export default App;