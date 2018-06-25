// passport & google oauth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");

// import keys module
const keys = require("../config/keys");

// load "user" model
const User = mongoose.model("users");

// create new instance of strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
    }, (accesToken, refreshToken, profile, done) => {

        // check if user exists
        User.findOne({
            googleID: profile.id
        })
        .then((existingUser) => {
            // insert new user if not present
            if (!existingUser) {
                new User ({
                    googleID: profile.id
                }).save();
            };
        });
    })
);