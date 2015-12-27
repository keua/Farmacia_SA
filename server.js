var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var logger = require("express-logger");
var server = http.createServer(app);
var routes = require('./routes/routes');
var models   = require('./app/models/');
var orm = require("orm")



// configure Express
app.use(function (req, res, next) {
  models(function (err, db) {
    if (err) return next(err);

    req.models = db.models;
    req.db     = db;

    return next();
  });
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(logger({path: "logfile.txt"}));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({secret: 'HAJAI11234'}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
//-----------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

server.listen(8080, function() {
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});