
const { Subscriptions } = require("../models/subscriptions");
const _ = require('lodash');

module.exports = (req, res) => {
    const body = _.pick(req.body, ['endpoint', 'expirationTime', 'keys']);
    const subscription = new Subscriptions(body);

    subscription.save().then(() => {
        res.send();
    }).catch(e => {
        res.status(400).send(e);
    });
}