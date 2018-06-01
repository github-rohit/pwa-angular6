const { User } = require('../models/user');
const { ResetPassword } = require('../models/reset-password');
const { sendEmal } = require('../../email/email');
const Cryptr = require('cryptr');
const _ = require('lodash');

const cryptr = new Cryptr(process.env.SECRET);

const validatePasswordLink = (req, res) => {
    const body = _.pick(req.body, ['id']);

    ResetPassword.findOne({
        url: req.params.id
    }).then((pwdObj) => {
        if (pwdObj) {
            res.status(200).send();
        } else {
            return Promise.reject({invalid: true});
        }
        
    }).catch(err => {
        res.status(400).send(err);
    })
}

const resetPassword = (req, res) => {
    const body = _.pick(req.body, ['id', 'passwd']);

    ResetPassword.findOne({
        url: body.id
    }).then((pwdObj) => {
        if (pwdObj) {
            User.updatePassword(pwdObj.user_id, body.passwd).then(() => {
                // pwdObj.remove();
                res.status(200).send();
            }).catch(err => {
                return Promise.reject(err);
            });
        } else {
            return Promise.reject('Invalid url');
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send(e);
    });
}

module.exports = { validatePasswordLink, resetPassword }