// common module imports
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport =  require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User"); // require db module
require("./services/passport"); // require passport module

// connect mongoDB
mongoose.connect(keys.mongoURI);
const app = express();

// allow body parser
app.use(bodyParser.json());

// create cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in millisecs
        keys: [keys.cookieKey] // encrypt cookie
    })
);

// initalize and set cookie session
app.use(passport.initialize());
app.use(passport.session());

// allow routes for app
require("./routes/authroutes")(app);
require("./routes/billingroutes")(app);

// serve ut production assets
if (process.env.NODE_ENV === "production") {
    // serve ut static files
    app.use(express.static("client/build"));

    // if it dosent recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// listen on port 2000
const PORT = process.env.PORT || 2000;
app.listen(PORT);