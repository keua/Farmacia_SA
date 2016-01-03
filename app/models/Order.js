module.exports = function (orm, db) {
    var Order = db.define('order', {
        totalAmount: {
            type: 'integer',
            required: true
        },
        isCanceled: {
            type: 'boolean',
            required: false
        },
        dateEmited: {
            type: 'date',
            time: false
        }
    }, {
        validations: {},
        methods: {}
    });
    Order.hasOne('drugstore', db.models.drugstore, {
        required: true,
        reverse: 'orders'
    });
    Order.hasOne('operator', db.models.operator, {
        required: true,
        reverse: 'orders'
    });
    Order.hasOne('client', db.models.clients, {
        required: true,
        reverse: 'orders'
    });

    Order.hasMany('medicines', db.models.medicine, {
        quantity: {
            type: 'integer',
            required: true
        },
        PriceUnit: {
            type: 'number',
            required: true
        },
        drugstoreId: {
            type: 'integer',
            required: true
        }
    }, {
        reverse: 'orders',
        key: true
    });

    db.sync(function (err) {
        if (err) throw err;
    });
}