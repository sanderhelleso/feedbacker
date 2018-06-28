const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTepmplate = require("../services/emailTemplates/surveyTemplate");

const Surveys = mongoose.model("surveys");

module.exports = app => {
    app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recepients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recepients: recepients.split(",").map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // send email
        const mailer = new Mailer(survey, surveyTepmplate(survey));
    });
};