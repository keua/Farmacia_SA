module.exports = function (orm, db) {
    var Animal = db.define('animal', {
        name : String
    },
      {
        validations: {
          name   : orm.enforce.ranges.length(1, 50)
        },
        methods: {
          serialize: function () {
            return {
              name      : this.name
            }
          }
        }
    });
    Animal.hasOne('duenio', db.models.person, { required: true, reverse: 'mascotas'});
    
     db.sync(function (err) {
         if (err) throw err;
    });
}