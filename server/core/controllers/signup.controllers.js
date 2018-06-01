const { User } = require('../models/user');
const { sendEmal } = require('../../email/email');

module.exports = (req, res) => {
    const host = req.get('host');
    const data = req.body;
    const user = new User({
        email: data.email,
        name: data.name,
        passwd: data.passwd
    });
    
    user.save(user).then(() => {
        sendEmal(host, 'email-verify', 'verification', 'Please verify your email address', user);
        res.send(user);
    }).catch(e => {
        if (e.code === 11000) {
            res.status(400).send({Unique: true});
        } else {
            res.status(400).send(e);
        }
    });

}