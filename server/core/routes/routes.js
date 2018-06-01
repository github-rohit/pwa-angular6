const signup = require('../controllers/signup.controllers');
const login = require('../controllers/login.controllers');
const forgot = require('../controllers/forgot-password.controllers');
const verifier = require('../controllers/email-verifier.controllers');
const {validatePasswordLink, resetPassword } = require('../controllers/reset-password.controllers');
const update = require('../controllers/update-password.controllers');

const logout = require('../controllers/logout.controllers');

module.exports = (router, authRoute) => {
    router.route('/signup').post(signup);  
    router.route('/login').post(login);  
    router.route('/forgotpassword').post(forgot);  
    router.route('/verification').post(verifier); 

    router.route('/resetpassword/:id').get(validatePasswordLink);
    router.route('/resetpassword').post(resetPassword);   

    authRoute.route('/updatepassword').patch(update);   
    authRoute.route('/logout').post(logout)
}