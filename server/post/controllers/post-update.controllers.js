const { Post } = require('../models/post');
const _ = require('lodash');

module.exports = (req, res) => {

    Post.findOneAndUpdate({
        _id: req.params.id,
        created_by: req.user._id
    }, req.body).then((post) => {
        res.send(post);
    }).catch(error => {
        res.status(400).send(error);
    });
}