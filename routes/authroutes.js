// import passport module
const passport = require("passport");

module.exports = app => {
    // google sign in route
    app.get(
        "/auth/google", 
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    // google sign in handler
    app.get(
        "/auth/google/callback",
        passport.authenticate("google")
    );
}
