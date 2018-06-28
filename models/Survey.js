const mongoose = require("mongoose");
const {Schema } = mongoose;

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [String] // Array containing list of Strings
});

// set model
mongoose.model("surveys", surveySchema);