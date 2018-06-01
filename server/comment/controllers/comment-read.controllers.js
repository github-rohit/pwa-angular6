const { Comments } = require('../models/comment');
const _ = require('lodash');

module.exports = (req, res) => {

    Comments.getComments(req.params).then((comments) => {
        res.send(comments);
    }).catch(e => {
        res.status(400).send(e);
    });

}