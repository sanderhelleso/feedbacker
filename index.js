// require common modules
const express = require("express");

// initialize app as express
const app = express();

// handlers 
app.get("/", (req,res) => {
    res.send({hi: "there"});
});

// listen on port 2000
app.listen(2000);