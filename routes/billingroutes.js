const keys = require("../config/keys")
const stripe = require("stripe")();

// handle payment routes
module.exports = app => {
    app.post("/api/stripe", (req, res) => {

    });
};