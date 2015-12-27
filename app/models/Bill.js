module.exports = function (orm, db) {
    var Bill = db.define('bill', {
        mount: {
            type: 'number',
            required: true
        },
        date: {
            type: 'date',
            time: true
        }
    }, {
        validations: {
        },
        methods: {            
        }
    });
    
    Bill.hasOne('employee', db.models.employee, {required: true,reverse: 'bills'});
    Bill.hasOne('client', db.models.client,     {required: true,reverse: 'bills'});
    
    Bill.hasMany('medicines', db.models.drugstore_medicines, {
        quantity: {
            type: 'integer',
            required: true
        },
        PriceUnit: {
            type: 'number',
            required: true
        }
    }, {
        reverse: 'bills',
        key: true
    });

    db.sync(function (err) {
        if (err) throw err;
    });
}