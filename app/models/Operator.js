module.exports = function (orm, db) {
    var Operator = db.define('operator', {
        name: {
            type: 'text',
            required: true
        }  
    }, {
        validations: {
            name: orm.validators.unique("El nombre ingresado ya existe.")},
        methods: {
                    serialize: function () {
                    return {
                        name: this.name
                            }
                    }
                }
        });

    Operator.hasOne('callcenter', db.models.callcenter, {autoFetch : true,required: true,reverse: 'operators'});
    Operator.hasMany('orders', db.models.order, {
        isOk: {
            type: 'integer',
            required: true
        }
    }, {
        reverse: 'operators',
        key: true
    });
    
    db.sync(function (err) {
        if (err) throw err;
    });
}