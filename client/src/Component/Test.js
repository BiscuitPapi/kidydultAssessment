import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FileUploader } from "react-drag-drop-files";
import Stack from "@mui/material/Stack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomSnackbar from "./Notification/Snackbar";
import IconButton from "@mui/joy/IconButton";
import ReactDOM from 'react-dom'; // Import ReactDOM

const fileTypes = ["txt"];

export default function AutoGrid() {

  function generate(element) {
    return [0].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [fileContent, setFileContent] = useState("");
  const [result, setResult] = useState([]);
  const [type, setType] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [dense, setDense] = useState(false);

  function readFile(file) {
    const fr = new FileReader();
    setFileName(file.name);
    setType(file.type);
    fr.readAsText(file);
    fr.onload = (event) => {
      setFileContent(event.target.result);
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
        console.log("conetnet", fileContent);
        const response = await fetch(`api/sorting?fileContent=${dataTosend}`);
        if (!response.ok) {
          alert("The text file is not in the right format.");
        }
        const data = await response.json();
        setPreview(fileContent);
        setResult(data);

        console.log(data[0].user);
        console.log(data);
      }
    } catch (error) {
      console.log("Failed to upload file: \n", error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
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
                display: "flex",
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
                style={{ width: "800px", height: "40px" }}
              >
                {fileName === null ? (
                  <div style={{ justifyContent: "center" }}>
                    <h2>Drag and drop your file here</h2>
                  </div>
                ) : (
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Stack spacing={0} sx={{}}>
                          {" "}
                          <Typography
                            variant="h3"
                            component="div"
                            color={"#0288d1"}
                          >
                            Files ready to be uploaded
                          </Typography>
                          <Demo>
                            <List dense={dense}>
                              {generate(
                                <ListItem>
                                  <ListItemIcon>
                                    <FolderIcon style={{ fontSize: "5rem" }} />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <span
                                        style={{
                                          fontSize: "18px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {fileName}
                                      </span>
                                    }
                                    secondary={
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          color: "gray",
                                        }}
                                      >
                                        {type}
                                      </span>
                                    }
                                  />
                                </ListItem>
                              )}
                            </List>
                          </Demo>
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          border: "1px solid black",
                          paddingBottom: "300px",
                          paddingRight: "10px",
                        }}
                      >
                        <h3>Content Preview</h3>
                        <h5>{fileContent}</h5>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </FileUploader>{" "}
            </Paper>
            <Button mt={2} variant="contained" onClick={handleClick}>
              Upload
            </Button>
            <CustomSnackbar />
          </Stack>
        </Grid>
        <Grid item xs>
          <Stack spacing={2} sx={{}}>
            <h1>Result</h1>
            <Paper
              sx={{
                width: "auto",
                height: "auto",
                minHeight: "65vh",
                padding: 2,
                display: "flex",
              }}
              elevation={3}
            >
              <div>
                {result === null ? (
                  <p>Please upload a text file</p>
                ) : (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: "60vh" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Rank</TableCell>
                          <TableCell>User</TableCell>
                          <TableCell>Word Count</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.map((row) => (
                          <TableRow>
                            <TableCell>{row.rank}</TableCell>
                            <TableCell>{row.user}</TableCell>
                            <TableCell>{row.value} words</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
