module.exports = function (orm, db) {
    var Payment = db.define('payment', {
        mount: {
            type: 'number',
            required: true
        },
        surcharge: {
            type: 'number',
            required: true
        }
    }, {
        validations: {},
        methods: {}
    });

    Payment.hasOne('bill', db.models.bill, {
        required: true,
        reverse: 'bills'
    });
    Payment.hasOne('paymenttype', db.models.paymenttype, {
        required: true,
        reverse: 'paymentypes'
    });

    db.sync(function (err) {
        if (err) throw err;
    });
}