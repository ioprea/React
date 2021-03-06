const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/templates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({
            _user: req.user.id
        }).select({
            recipients: false
        });
        res.send(surveys);
    });

    app.get('/api/surveys/thanks', (req,res) => {
        res.send('Thanks!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email =>  ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            await req.user.save();

            res.send(req.user);
        } catch(err) {
            res.status(422).send();
        }

    });
};