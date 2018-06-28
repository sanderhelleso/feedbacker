const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTepmplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(",").map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        console.log(survey);

        // send email
        const mailer = new Mailer(survey, surveyTepmplate(survey));
        try {
            await mailer.send();

            // save survey to DB
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            // update user model
            res.send(user);
        }

        // catch and send any error
        catch(err) {
          res.status(422).send(err);  
        }
    });
};