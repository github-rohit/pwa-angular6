const { User } = require('../models/user');
const _ = require('lodash');

module.exports = (req, res) => {
    const body = _.pick(req.body, ['email', 'passwd']);

    return User.findByCredentials(body.email, body.passwd).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send({
                token: token
            });
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
}