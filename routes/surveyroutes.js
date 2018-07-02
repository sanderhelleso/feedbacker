const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTepmplate = require("../services/emailTemplates/surveyTemplate");

// model
const Survey = mongoose.model("surveys");

module.exports = app => {
    
    // list all surveys
    app.get("/api/surveys", requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id });
        res.send(surveys);
    });

    // user voting / thank you screen
    app.get("/api/surveys/:surveyId/:choice", (req, res) => {
        res.send("Thanks for voting!");
    });

    // webhook
    app.get("/api/surveys/webhooks", (req, res) => {
        const parser = new Path("/api/surveys/:surveyId/:choice"); // /: wildcard
        const events = _chain(req.body)

        // itterate
        _.chain(req.body, ({ email, url }) => {
            const match = parser.test(new URL(url).pathname);
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice }
            }
        })

        // remove undefined values
        .compact()

        // remove duplicate values
        .uniqBy("email", "surveyId")

        // update value query
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $eleMatch: { email: email, responded: false }
                }
            }, {
                $inc: { [choice]: 1 },
                $set: { "recipients.$.responded": true },
                lastResponded: new Date()
            }).exec(); // execute query
        })

        // return value
        .value();

        // send response so it dosent hang
        res.send({});
    });

    // post a new mail survey
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