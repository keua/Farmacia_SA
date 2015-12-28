module.exports = function (orm, db) {
    var Medicine = db.define('medicine', {
        name : String,
        description : String
    },
      {
        validations: {
            name   : orm.enforce.ranges.length(1, 50),
            description   : orm.enforce.ranges.length(1, 250)
        },
        methods: {
          serialize: function () {
            return {
              name      : this.name
            }
          }
        }
    });
     db.sync(function (err) {
         if (err) throw err;
    });
}