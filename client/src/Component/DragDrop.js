import React, {useState} from 'react'
import Button from '@mui/material/Button';

function DragDrop() {
const [files, setFiles] = useState(null);

  return (
    <>
        {!files && (
            <div className ="dropzone">
                <h1>(Drag and drop your file here)</h1>
                <Button variant="contained">Upload</Button>
            </div>


        )}
    </>
  )
}

export default DragDrop