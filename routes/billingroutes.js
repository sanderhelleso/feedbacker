// import stripe and keys
const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey);

// handle payment routes
module.exports = app => {
    app.post("/api/stripe", (req, res) => {
        console.log(req.body);
    });
};