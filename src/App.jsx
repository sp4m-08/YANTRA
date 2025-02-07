import React from "react";
import Dashboard from "./components/Dashboard";
import {generateToken} from "./notifications/firebase";
import {useEffect} from "react";
import {onMessage} from "firebase/messaging";



function App() {
  // useEffect(()=>{
  //   generateToken();
  //   onMessage(messaging,(payload)=>{
  //     console.log(payload);
  //   })
  // },[]);

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
