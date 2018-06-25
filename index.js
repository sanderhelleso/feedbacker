// initialize app as express
const express = require("express");
const app = express();
require("./services/passport"); // require custom module

// allow routes for app
require("./routes/authRoutes")(app);

// listen on port 2000
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log("app started on " + PORT);
});