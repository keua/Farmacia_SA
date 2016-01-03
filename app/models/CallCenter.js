module.exports = function (orm, db) {
    var CallCenter = db.define('callcenter', {
        name: {
            type: 'text',
            required: true
        },
        isWorking: {
            type: 'boolean',
            required: false
        }
    }, {
        validations: {},
        methods: {}
        });

    /*CallCenter.hasMany('operators', db.models.operator, {
        isOnDuty: {
            type: 'integer',
            required: true
        }
    }, {
        reverse: 'callcenters',
        key: true
    });*/
    db.sync(function (err) {
        if (err) throw err;
    });
}