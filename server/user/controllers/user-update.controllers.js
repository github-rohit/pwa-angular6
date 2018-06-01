const { User } = require('../../core/models/user');
const _ = require('lodash');

module.exports = (req, res) => {
    User.update({
        _id: req.user._id
    }, req.body).then(user => {
        res.send(user);
    }).catch(error => {
        res.status(400).send(error);
    });
}