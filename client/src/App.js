import React, { useEffect, useState } from "react";
import DragDrop from "./Component/DragDrop";
import UI from "./Component/UI";
import "./App.css";
import NavBar from "./Component/NavBar";
import Test from "./Component/Test";

function App() {
  return (
    <div>
      <NavBar/>
     <Test/>
    </div>
  );
}

export default App;
