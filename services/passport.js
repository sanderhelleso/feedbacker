// passport & google oauth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");

// import keys module
const keys = require("../config/keys");

// load "user" model
const User = mongoose.model("users");

// identify user module
passport.serializeUser((user, done) => {
    done(null, user.id); // mongo UID, NOT google ID
});

// find specific user in collection / db
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

// create new instance of strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
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
                })
                .save()
                .then(user => {
                    done(null, user);
                });
            }
            // there is allready a user with given ID
            else {
                done(null, existingUser);
            }
        });
    })
);