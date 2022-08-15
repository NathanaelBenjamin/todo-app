import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(listOfTasks));
  // }, [listOfTasks]);

  // var response = JSON.parse(localStorage.getItem("tasks"));
  // console.log(response)

