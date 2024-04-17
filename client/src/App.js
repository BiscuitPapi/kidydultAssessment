import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Component/NavBar";
import DragDrop from "./Component/DragDrop";

function App() {
  return (
    <div>
      <NavBar/>
     <DragDrop/>
    </div>
  );
}

export default App;
