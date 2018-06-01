const read = require('../controllers/comment-read.controllers');
const create = require('../controllers/comment-create.controllers');
const del = require('../controllers/comment-delete.controllers');

module.exports = (router, authRoute) => {
    router.route('/comment/:postId').get(read);  

    authRoute.route('/comment').post(create);  
    authRoute.route('/comment/:id').delete(del); 
}