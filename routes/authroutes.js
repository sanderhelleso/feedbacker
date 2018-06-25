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

    // logout current user
    app.get("/api/logout", (req, res) => {
        req.logout();
        res.send(req.user);
    }); 

    // check oauth flow and get access
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
}
