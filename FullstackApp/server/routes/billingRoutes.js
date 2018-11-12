const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, (req, res) => {
        stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id, // obtained with Stripe.js
            description: "5$ for 5 credits"
        }).then((charge) => {
            req.user.credits += 5;
            return req.user.save();
        }).then((user) => {
            res.send(user);
        })
    });
};