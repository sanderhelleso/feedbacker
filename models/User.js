// import mongoose module
const mongoose = require("mongoose");
const { Schema } = mongoose; // same as Schema = mongoose.Schema;

// define "users" schema
const userSchema = new Schema({
    googleID: String,
    credits: { type: Number, default: 0 }
});

// create collection "users"
mongoose.model("users", userSchema);