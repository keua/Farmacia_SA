var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createAnimal: function(req, res, next) {
      var params = _.pick(req.body, 'name', 'duenio_id');
       req.models.animal.create(params, function (err, data) {
            if(err) {
              if(Array.isArray(err)) {
                return res.send(200, err);
              } else {
                return next(err);
              }
            }
            console.log(data.serialize());
            return res.send(200, data.serialize());
          });
    },
    
    getAnimalAll: function(req, res, next) {
      req.models.person(req.params.id).getMascotas(function (err, pets) {
        res.send(pets)
      });
    },
    
    deleteAnimal:function (req, res,next) {
         req.models.animal.get(req.params.pet, function (err, data) {
             if(err)
                return next(err);
            data.remove(function(err){
                if(err)
                    return next(err);
                    
                res.send('ok');
             });
         });
    }
}