
const { Post } = require('../models/post');
const _ = require('lodash');

module.exports = (req, res) => {
    

    res.send(req.query);
}