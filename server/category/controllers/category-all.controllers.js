const { Categories } = require('../models/category');
const _ = require('lodash');

module.exports = (req, res) => {
    Categories.find().then((categories) => {
        res.send(categories);
    }).catch(e => {
        res.status(400).send(e);
    });
}