/*
  dependencies
*/

const express = require("express");

/* 
  config - express
*/
const app = express();
const port = 3000;

/*
  endpoint
*/

app.get("/posts", (request, response) => {
  let posts = [
    {
      caption: "Golden Gate Bridge",
      location: "San Fracisco",
    },
    {
      caption: "London Eye",
      location: "London",
    },
  ];
  response.send("I <3 Node!");
});

/*
  listen
*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
