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
    
    Bill.hasOne('employee', db.models.employee, {autoFetch:true,required: true,reverse: 'bills'});
    Bill.hasOne('client', db.models.client,     {required: true,reverse: 'bills'});

    db.sync(function (err) {
        if (err) throw err;
    });
}