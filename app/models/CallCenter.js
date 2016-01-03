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

    db.sync(function (err) {
        if (err) throw err;
    });
}