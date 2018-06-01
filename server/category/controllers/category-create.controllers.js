const { Categories } = require('../models/category');
const _ = require('lodash');

module.exports = (req, res) => {
    const body = _.pick(req.body, ['category', 'count']);
    const category = new Categories(body);

    category.save().then(()=> {
        res.send(category);
    }).catch(e => {
        res.status(400).send(e);
    });
}