// reference the http module so we can create a webserver
var config = require("./config");
var http = require("http");
var _ = require("lodash");
var noop = require('node-noop').noop;
var model = require("./model");
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer'); 
var path = require('path'); 
var fileSystem = require('fs'); 
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('./utils/logger').getLogger('app:server');
var MongoStore = require('connect-mongo')(session);
var compression = require("compression");

logger.info("Starting express");

var ws = express();
ws.set('port', process.env.PORT || 3001);
ws.use(compression());
ws.use(bodyParser.json()); // for parsing application/json
ws.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
ws.use(cookieParser()); // for parsing cookies
var sessionMiddleware = session({
    secret: "keyboard cat",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({
        url: config.db.mongodb,
        touchAfter: 24 * 3600 // time period in seconds
    })
});
ws.use(sessionMiddleware);
ws.use(passport.initialize());
ws.use(passport.session());
ws.use(multer()); // for parsing multipart/form-data
ws.use(express.static(path.join(__dirname, 'public')));
ws.use(function(req, res, next) {
    if (req.user) {
        res.cookie('user', JSON.stringify(req.user));    
    }
    next();
});

require("./endpoints").up(ws, model);

ws.listen(ws.get('port'), function(){
    logger.info('Express server listening on port ' + ws.get('port'));
});


if(process.env.AGENDA === 'on'){
    var jobs = require('./jobs/jobs');
}


logger.info("Express Started");