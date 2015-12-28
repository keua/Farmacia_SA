var orm = require('orm');
var settings = require('../../config/settings');

var connection = null;

function setup(db, cb) {

    require('./Client')(orm, db);
    require('./Medicine')(orm, db);
    require('./Drugstore')(orm, db);
    require('./Employee')(orm, db);
    require('./Bill')(orm, db);
    require('./PaymentType')(orm, db);
    require('./Payment')(orm, db);
    return cb(null, db);
}

module.exports = function (cb) {
    if (connection) return cb(null, connection);

    orm.connect(settings.database, function (err, db) {
        if (err) return cb(err);

        connection = db;
        db.settings.set('instance.returnAllErrors', true);
        setup(db, cb);
    });
};