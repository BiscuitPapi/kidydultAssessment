import React, { useEffect, useState } from "react";
import DragDrop from "./Component/DragDrop";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <DragDrop/>
  );
}

export default App;
