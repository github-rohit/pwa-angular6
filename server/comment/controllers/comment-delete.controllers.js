const { Comments } = require('../models/comment');
const _ = require('lodash');

module.exports = (req, res) => {
    

    res.send(req.query);
}