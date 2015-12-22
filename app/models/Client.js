module.exports = function (orm, db) {
    var Client = db.define('client', {
        name: {
            type: 'text',
            required: true
        },
        lastName: {
            type: 'text',
            required: true
        },
        nit: {
            type: 'text',
            required: true,
            unique: true
        },
        phoneNumber: {
            type: 'integer',
            required: true
        },
        address: {
            type: 'text',
            required: true
        },
        birth: {
            type: 'date',
            time: false
        }
    }, {
        validations: {
            name: orm.enforce.ranges.length(1, 50),
            lastName: orm.enforce.ranges.length(1, 50),
            nit: orm.enforce.ranges.length(1, 10),
            nit: orm.validators.unique("El nit ingresado ya existe."),
            address: orm.enforce.ranges.length(1, 50)
        },
        methods: {
            serialize: function () {
                return {
                    name: this.name,
                    lastName: this.lastName,
                    nit: this.nit,
                    phoneNumber: this.phoneNumber,
                    address: this.address,
                    birth: this.birth
                }
            }
        }
    });

    db.sync(function (err) {
        if (err) throw err;
    });
}