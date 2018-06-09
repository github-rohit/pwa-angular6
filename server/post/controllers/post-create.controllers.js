const { Post } = require('../models/post');
const { POST_STATUS } = require('../../config/config');
const notification = require("../../push-notification/controllers/push-notification.controllers");
const _ = require('lodash');

module.exports = (req, res) => {
    const body = _.pick(req.body, ['title', 'description', 'image', 'category', 'tags', 'status']);
    body.status = POST_STATUS[body.status];
    body.created_by = req.user._id;

    const post = new Post(body);
    post.save().then(()=> {
        notification(post);
        res.send(post);
    }).catch(e => {
        res.status(400).send(e);
    });
    
}