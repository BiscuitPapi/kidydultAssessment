import React, { useEffect, useState } from "react";
import DragDrop from "./Component/DragDrop";
import "./App.css";
import Box from "@mui/material/Box";
import Result from "./Component/Result";

function App() {
  const [result, setResult] = useState(null);

  return (
    <DragDrop/>
  );
}

export default App;
