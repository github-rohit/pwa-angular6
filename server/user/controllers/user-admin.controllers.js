const { User } = require('../../core/models/user');
const _ = require('lodash');

module.exports = (req, res) => {
    User.find({
        _id: req.params.id
    }).then((user) => {
        res.send(user);
    }).catch(e => {
        res.status(400).send(e);
    });
}