var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require("passport");
var logger = require("express-logger");
var server = http.createServer(app);
var routes = require('./routes/routes');
var models = require('./app/models/');
var orm = require("orm");
var cors = require('cors')

require('./config/passport')(passport);
// configure Express
app.use(function (req, res, next) {

    models(function (err, db) {
        if (err) return next(err);

        req.models = db.models;
        req.db = db;

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        return next();
    });
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(logger({
    path: "logfile.txt"
}));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
    secret: 'keyboard cat'
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
//-----------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/', routes);

server.listen(8080, function () {
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});