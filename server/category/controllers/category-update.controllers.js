const { Categories } = require('../models/category');
const _ = require('lodash');

module.exports = (req, res) => {
    

    res.send(req.query);
}