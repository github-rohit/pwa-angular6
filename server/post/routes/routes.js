const all = require('../controllers/post-all.controllers');
const { single, singleWithAuth } = require('../controllers/post-single.controllers');
const create = require('../controllers/post-create.controllers');
const update = require('../controllers/post-update.controllers');
const del = require('../controllers/post-delete.controllers');

module.exports = (router, authRoute) => {
    router.route('/posts').get(all);  
    router.route('/posts/:id').get(single);   
     
    authRoute.route('/posts').post(create);  
    authRoute.route('/posts/:id').post(singleWithAuth); 
    authRoute.route('/posts/:id').patch(update);    
    authRoute.route('/posts/:id').delete(del); 
}