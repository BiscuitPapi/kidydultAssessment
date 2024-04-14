import React, { useState } from "react";
import Button from "@mui/material/Button";

import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["txt"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {};

  const onTypeError = (err) => {
    alert("Error file type. Please upload a text file");
  };

  return (
    <div className="dropzone">
      <FileUploader
        handleChange={handleChange}
        label=""
        types={fileTypes}
        onTypeError={onTypeError}
      >
        <h1>(Drag and drop your file here)</h1>
      </FileUploader>
    </div>
  );
}

export default DragDrop;
