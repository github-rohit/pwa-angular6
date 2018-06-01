const { User } = require('../models/user');

module.exports = (req, res) => {
    const token = req.get('x-auth');

    return req.user.removeToken(token).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send(e);
    });
}