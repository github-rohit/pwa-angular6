const { User } = require('../models/user');
const Cryptr = require('cryptr');
const _ = require('lodash');

module.exports = (req, res) => {
    const body = _.pick(req.body, ['id']);
    const cryptr = new Cryptr(process.env.SECRET);
    const decryptedString = cryptr.decrypt(body.id);

    User.findOne({
        email: decryptedString
    }).then((user) => {
        if (!user) {
            return Promise.reject({
                error: 'Invalid url.'
            });
        } else {
            return Promise.resolve(user);
        }
    }).then((user) => {
        return User.update({
            _id: user._id
        }, {
            status: 'ACTIVE'
        })
    }).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send(e);
    });

}