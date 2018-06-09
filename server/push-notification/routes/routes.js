const subscribe = require("../controllers/subscribe.controllers");

module.exports = (router, authRoute) => {
    router.route('/subscription').post(subscribe);
}