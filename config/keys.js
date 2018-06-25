// return prod keys
if(process.env.NODE_ENV === "production") {
    module.exports = require("./dev");
}

// return dev keys
else {
    module.exports = require("./dev");
}