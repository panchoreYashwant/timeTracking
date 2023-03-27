import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from 'react';
import TimeTrackerApp from './Components/TimeTrackerApp';

export const MyContext = createContext();
function App() {
  const[data,setData] = useState()

  return (
    <React.Fragment>
    <MyContext.Provider value={{data,setData}}>
    <TimeTrackerApp/>
    </MyContext.Provider>
    </React.Fragment>
  );
}

export default App;
