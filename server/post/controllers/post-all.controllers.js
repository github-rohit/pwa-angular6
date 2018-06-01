
const { Post } = require('../models/post');
const _ = require('lodash');

module.exports = (req, res) => {
    
    Post.getPosts(req.query).then((posts) => {
        res.send(posts);
    }).catch(e => {
        res.status(400).send(e);
    });

}