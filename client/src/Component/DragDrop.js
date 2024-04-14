import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css'; 
import Col from 'react-bootstrap/Col'; 
import Row from 'react-bootstrap/Row'; 

import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["txt"];
let fileReader;

function DragDrop() {
  const [fileContent, setFileContent] = useState(null);

  //Function to handle the content of the file
  const handleFileRead = (e) => {
    const content = fileReader.result;
    setFileContent(content.toString());
  };

  const handleChange = (file) => {
    const fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function () {
      setFileContent(fr.result);
    };

    // fileReader = new FileReader();
    // fileReader.readAsText(file);
    // fileReader.onload = () => {
    //   setFileContent(fileReader.result);
    // };
  };

  //Error handling to make sure that user only uploads txt file
  const onTypeError = (err) => {
    alert("Error file type. Please upload a text file");
  };

  const handleClick = async (err) => {
    try {
      if (!fileContent) {
        alert("The file is empty");
      } else {
        var dataTosend = JSON.stringify(fileContent);
        const response = await fetch(`/api/sorting?fileContent=${dataTosend}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log(data);
      }
    } catch (error) {
      console.log("Failed to upload file: \n", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Upload a log file (.txt)</h1>
      <div className="dropzone">
        <FileUploader
          handleChange={handleChange}
          label=""
          types={fileTypes}
          onTypeError={onTypeError}
        >
          <center><h1>(Drag and drop your file here)</h1></center>
        </FileUploader>
      </div>
      <Box mt={3}></Box>
      <Button mt={2} variant="contained" onClick={handleClick}>
        Upload
      </Button>
    </div>
  );
}

export default DragDrop;
