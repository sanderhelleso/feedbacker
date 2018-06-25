// initialize app as express
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User"); // require db module
require("./services/passport"); // require passport module

// connect mongoDB
mongoose.connect(keys.mongoURI);
const app = express();

// allow routes for app
require("./routes/authRoutes")(app);

// listen on port 2000
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log("app started on " + PORT);
});