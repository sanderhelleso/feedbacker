const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

// mailer class
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        // mail signature
        this.sendgridApi = sendgrid(keys.sendGridKey);

        // mailer properties
        this.from_email = new helper.Email("no-reply@feedbacker.com");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        this.recipients = this.formatAddresses(recipients);

        // mailer content
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    // format every address in recipients list
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    // enable click tracker
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    // add all recipients
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    // send mail
    async send() {
        const request = this.sendgridApi.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: this.toJSON()
        });

        const response = this.sendgridApi.API(Request);
        return response;
    }
}

// export Mailer class
module.exports = Mailer;