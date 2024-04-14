import React, {useEffect, useState} from 'react'
import DragDrop from "./Component/DragDrop"
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState(null)

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      <DragDrop/>
    </div>
  )
}

export default App