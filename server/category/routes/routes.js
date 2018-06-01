const all = require('../controllers/category-all.controllers');
const create = require('../controllers/category-create.controllers');
const update = require('../controllers/category-update.controllers');
const del = require('../controllers/category-delete.controllers');

module.exports = (router) => {
    router.route('/category').get(all);  
    router.route('/category').post(create);  
    router.route('/category/:id').patch(update);    
    router.route('/category/:id').delete(del); 
}