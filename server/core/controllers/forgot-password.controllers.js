const { User } = require('../models/user');
const { ResetPassword } = require('../models/reset-password');
const { sendEmal } = require('../../email/email');
const Cryptr = require('cryptr');
const _ = require('lodash');

const cryptr = new Cryptr(process.env.SECRET);

module.exports = (req, res) => {
    const host = req.get('host');
    const body = _.pick(req.body, ['email']);
    let user;

    return User.findOne(body).then((userObj) => {
        user = userObj;

        if (user) {
            return resetpassword(user);
        }
    }).then((pwd) => { 
        sendEmal(host, 'email-forgot-password', 'resetpassword', 'Reset password', user, pwd.url);       
        res.status(200).send();
    }).catch((e) => {
        console.log(e)
        res.status(400).send(e);
    });

    function resetpassword(user) {
        const date = new Date();
        const encryptedString = cryptr.encrypt(date + user._id);

        const pwd = new ResetPassword({
            user_id: user._id,
            url: encryptedString
        }); 

        return pwd.save();
    }
}