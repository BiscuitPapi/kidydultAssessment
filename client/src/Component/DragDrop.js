import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";

import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["txt"];
let fileReader;

function DragDrop(props) {
  const [fileContent, setFileContent] = useState(null);
  const [previousRead, setTest] = useState("");
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [userFiles, setUserFiles] = useState([]);

  const handleChange = (e) => {
    setFileName(e.name);
    const fr = new FileReader();
    fr.readAsText(e);
    fr.onload = function () {
      setFileContent(fr.result);
    };
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
        const response = await fetch(`api/sorting?fileContent=${dataTosend}`);
        console.log(fileContent);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log(response);
        const data = await response.json();

        console.log(data);
        setResult(data);
      }
    } catch (error) {
      console.log("Failed to upload file: \n", error);
    }
  };

  return (
    <Box height={700} my={4} display="flex" alignItems="center" gap={4} p={2}>
      <div style={{ display: "block", padding: "2rem" }}>
        <h1>Upload a log file (.txt)</h1>
        <div className="dropzone">
          <FileUploader
            handleChange={(e) => handleChange(e)}
            label=""
            types={fileTypes}
            onTypeError={onTypeError}
            multiple={false}
          >
            <center>
              {fileName === null ? (
                <h1>(Drag and drop your file here)</h1>
              ) : (
                <div>
                  <p>Files ready to be uploaded</p>
                  <ul>
                   <li>{fileName}</li>
                  </ul>
                </div>
              )}
            </center>
          </FileUploader>
        </div>
        <Box mt={3}></Box>
        <Button mt={2} variant="contained" onClick={handleClick}>
          Upload
        </Button>
      </div>
      <div>
        {" "}
        <h1>Results:</h1>
        <div className="resultBox">
          {result === null ? (
            <p>Please upload a text file</p>
          ) : (
            result.map((data, i = 1) => (
              <p>
                {data.rank} {data.user} - {data.value} words
              </p>
            ))
          )}
        </div>
        <Box mt={6}></Box>
      </div>
    </Box>
  );
}

export default DragDrop;
