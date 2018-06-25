// require common modules
const express = require("express");

// passport & google oauth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

// import keys module
const keys = require("./config/keys");

// initialize app as express
const app = express();

// create new instance of strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
    }, accesToken => {
        console.log(accesToken);
    })
);

// google sign in route
app.get(
    "/auth/google", 
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// listen on port 2000
const PORT = process.env.PORT || 2000;
app.listen(PORT);