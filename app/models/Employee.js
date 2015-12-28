module.exports = function (orm, db) {
    var Employee = db.define('employee', {
        name: {
            type: 'text',
            required: true
        },
        lastName: {
            type: 'text',
            required: true
        },
        username: {
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
        },
        password: {
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
            address: orm.enforce.ranges.length(1, 50),
            password: orm.enforce.ranges.length(1, 15),
            username: orm.validators.unique("El username ingresado ya existe.")
        },
        methods: {
            serialize: function () {
                return {
                    name: this.name,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                    address: this.address,
                    birth: this.birth
                }
            }
        }
    });

    Employee.hasOne('drugstore', db.models.drugstore, {
        required: true,
        reverse: 'employees'
    });

    db.sync(function (err) {
        if (err) throw err;
    });
}