const admin = require('../controllers/user-admin.controllers');
const update = require('../controllers/user-update.controllers');
const del = require('../controllers/user-delete.controllers');

module.exports = (router, authRoute) => {
    router.route('/author/:id').get(admin);  

    authRoute.route('/author/:id').patch(update);    
    authRoute.route('/author/:id').delete(del); 
}