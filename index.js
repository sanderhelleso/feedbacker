// require common modules
const express = require("express");

// initialize app as express
const app = express();

// route handlers 
app.get("/", (req,res) => {
    res.send({hi: "there"});
});

// listen on port 2000
const PORT = process.env.PORT || 2000;
app.listen(PORT);