module.exports = function (orm, db) {
    var Drugstore = db.define('drugstore', {
        name: {
            type: 'text',
            required: true
        },
        phoneNumber: {
            type: 'integer',
            required: true
        },
        address: {
            type: 'text',
            required: true
        }
    }, {
        validations: {
            name: orm.enforce.ranges.length(1, 50),
            address: orm.enforce.ranges.length(1, 50)
        },
        methods: {

        }
    });

    Drugstore.hasMany('medicines', db.models.medicine, {
        quantity: {
            type: 'integer',
            required: true
        },
        PriceUnit: {
            type: 'number',
            required: true
        }
    }, {
        reverse: 'drugstores',
        key: true
    });
    //Animal.hasOne('duenio', db.models.person, { required: true, reverse: 'mascotas'});    
    db.sync(function (err) {
        if (err) throw err;
    });
}