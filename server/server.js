const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

const config = require('./config/config');
const routes = require('./routes');
const {mongoose} = require('./db/mongoose');

const server = express();
const port = process.env.PORT;

server.use(express.static(path.join(__dirname, '../dist')));
server.set('view engine', 'ejs');
// serve angular front end files from root path
server.use('/server/', express.static('views', { redirect: false }));
server.use(bodyParser.json({limit: '5mb'}));
server.use(bodyParser.urlencoded({ limit: '5mb', extended: true}));

routes(server);

server.get('*', function (req, res, next) {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(port, () => {
    console.log('SERVER UP AND RUNNING AT PORT: ' + port);
});
