
const { Post } = require('../models/post');
const _ = require('lodash');


const single = (req, res) => {

    Post.getPosts(req.params).then((postObj) => {
        if (postObj.total) {
            res.send(postObj.posts);
        } else {
            res.status(404).send();
        }
        
    }).catch(e => {
        res.status(400).send(e);
    });

}

const singleWithAuth = (req, res) => {
    const query = {
        status: req.body.status || '',
        id: req.params.id,
        created_by: req.user._id
    }
    
    Post.getPosts(query).then((postObj) => {

        if (postObj.total) {
            res.send(postObj.posts);
        } else {
            res.status(404).send();
        }
        
    }).catch(e => {
        res.status(400).send(e);
    });

}

module.exports = { single, singleWithAuth };