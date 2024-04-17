import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { FileUploader } from "react-drag-drop-files";
import Stack from "@mui/material/Stack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const fileTypes = ["txt"];

function UI() {
  const [fileContent, setFileContent] = useState("null");
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState(null);

  function readFile(file) {
    const fr = new FileReader();
    fr.readAsText(file);
    fr.onload = (event) => {
      setFileContent(event.target.result)
    };
  }

  const handleChange = (e) => {
    console.log(e.length);
    readFile(e);
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
          alert("The text file is not in the right format.");
        }
        const data = await response.json();
        setResult(data);
      }
    } catch (error) {
      console.log("Failed to upload file: \n", error);
    }
  };

  return (
    <Paper
      sx={{
        width: "auto",
        height: "auto",
        padding: 2,
        display: "flex",
        alignItems: "center",
        background: "#90caf9 ",
      }}
      elevation={0}
    >
      <Paper
        sx={{
          width: "auto",
          height: "auto",
          minHeight: "70vh",
          minWidth: "100vh",
          padding: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Stack spacing={2} sx={{}}>
          <h1>Upload a log file (.txt)</h1>
          <Paper
            sx={{
              width: "auto",
              height: "auto",
              minHeight: "65vh",
              minWidth: "80vh",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            elevation={3}
          >
            <FileUploader
              handleChange={(e) => handleChange(e)}
              label=""
              types={fileTypes}
              onTypeError={onTypeError}
              multiple={false}
            >
              <center>
                {fileName === null ? (
                  <h2>(Drag and drop your file here)</h2>
                ) : (
                  <div>
                    <p>Files ready to be uploaded</p>
                    <ul>
                      <li>{fileName}</li>
                    </ul>
                  </div>
                )}
              </center>
            </FileUploader>{" "}
          </Paper>
          <Button mt={2} variant="contained" onClick={handleClick}>
            Upload
          </Button>
        </Stack>
      </Paper>
      <Paper
        sx={{
          padding: 1,
          backgroundColor: "transparent",
        }}
        elevation={0}
      />
      <Paper
        sx={{
          width: "auto",
          height: "auto",
          minHeight: "70vh",
          minWidth: "80vh",
          padding: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Stack spacing={2} sx={{}}>
          <h1>Result</h1>
          <Paper
            sx={{
              width: "auto",
              height: "auto",
              minHeight: "70vh",
              minWidth: "90vh",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            elevation={3}
          ></Paper>
        </Stack>
      </Paper>
    </Paper>
  );
}

export default UI;
