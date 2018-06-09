const express = require('express');
const core = require('./core/routes/routes');
const post = require('./post/routes/routes');
const category = require('./category/routes/routes');
const user = require('./user/routes/routes');
const subscriptions = require('./push-notification/routes/routes');
const comment = require('./comment/routes/routes');
const {authenticate} = require('./core/middleware/authenticate');

module.exports = (server) => {
    const router = express.Router();
    const authRoute = express.Router();

    authRoute.use(authenticate);

    core(router, authRoute);
    post(router, authRoute);
    category(router, authRoute);
    user(router, authRoute);
    comment(router, authRoute);
    subscriptions(router, authRoute);

    server.use('/api', router);
    server.use('/api', authRoute);
}