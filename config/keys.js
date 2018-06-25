// return prod keys
if(process.env.NODE_ENV === "production") {
    modules.exportes = require("./prod");
}

// return dev keys
else {
    modules.exportes = require("./dev");
}