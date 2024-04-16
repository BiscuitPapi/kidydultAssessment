const express = require("express");
const app = express();
const wordsCount = require("words-count").default;

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo"] });
});

app.get("/api/sorting", async (req, res) => {
  try {
    const fileContent = req.query;
    var rawData = JSON.parse(fileContent.fileContent);

    let proceedData = rawData.toString().split("\n");

    var i = 0;
    var currentUser = "";
    let unorderedList = [];
    var flag = 1;

    //Check if the txt file starts with a user or not
    if ((proceedData[i].split(" ")[0].charAt(0) != "<") && (proceedData[i].split(" ")[0].charAt(proceedData[i].split(" ")[0].length - 1) != ">")) {
      flag = 0;
    }

    //Loop every new line
    while (i < proceedData.length) {
      let words = proceedData[i].split(" ");

      var x = 0;
      var count = 0;
      //Check if the current word is user
      while (x < words.length) {
        if (words[x] == "") {
          break;
        }
        //If the current word is a user, then assign a new one
        //This is to cater in cases where the text file is not structured
        if (
          words[x].charAt(0) == "<" &&
          words[x].charAt(words[x].length - 1) == ">"
        ) {
          currentUser = words[x];
          count = 0;
        } else {
          count++;
        }
        x++;
      }
      //Add the filtered line into the JSON
      let jsonsData = { user: currentUser, value: count };
      unorderedList.push(jsonsData);
      i++;
    }

    //Check for distinct user for us to compare it later
    let userList = [];
    for (var key in unorderedList) {
      if (unorderedList.hasOwnProperty(key)) {
        if (!userList.includes(unorderedList[key].user)) {
          userList.push(unorderedList[key].user);
        }
      }
    }

    var counter = 0;
    let newList = [];

    //Total up the count for each user
    while (counter < userList.length) {
      var value = 0;

      for (var key in unorderedList) {
        if (unorderedList.hasOwnProperty(key)) {
          if (unorderedList[key].user == userList[counter]) {
            value = value + unorderedList[key].value;
          }
        }
      }
      let jsonData = { user: userList[counter], value: value };
      newList.push(jsonData);
      counter++;
    }

    var cleanList = [];
    //Clean the data (remove <>)
    for (var key in newList) {
      var name = newList[key].user.replace("<", "").replace(">", "");
      let jsonData = { user: name, value: newList[key].value };
      cleanList.push(jsonData);
    }

    //Sort the list in descending order
    cleanList = cleanList.sort((a, b) => {
      if (a.value > b.value) {
        return -1;
      }
    });

    let sortedList = [];
    var currentRank = 1;
    var previousVal = -1;
    for (var key in cleanList) {
      if (cleanList.hasOwnProperty(key)) {
        if (cleanList[key].value == previousVal) {
          let jsonData = {
            user: cleanList[key].user,
            value: cleanList[key].value,
            rank: "  ",
          };
          sortedList.push(jsonData);
        } else {
          let jsonData = {
            user: cleanList[key].user,
            value: cleanList[key].value,
            rank: currentRank + ".",
          };
          sortedList.push(jsonData);
          currentRank++;
        }
      }
      previousVal = cleanList[key].value;
    }
    if(flag == 1){
      res.send(sortedList);
    }

    else{
      res.status(404).send;
      res.send();
    }
   
    
  } catch (error) {
    console.log("Failed to upload file: ", error);
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
