module.exports = function (orm, db) {
    var PaymentType = db.define('paymenttype', {
        name: {
            type: 'text',
            required: true
        },
        surcharge: {
            type: 'number',
            required: true
        }
    }, {
        validations: {
            name   : orm.enforce.ranges.length(1, 50),
        },
        methods: {}
    });
    db.sync(function (err) {
        if (err) throw err;
    });
}