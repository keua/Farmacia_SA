var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createMedicine: function(req, res, next) {
      var params = _.pick(req.body, 'name', 'description');
       req.models.medicine.create(params, function (err, data) {
            if(err) {
              if(Array.isArray(err)) {
                return res.send(200, err);
              } else {
                return next(err);
              }
            }
            return res.send(200, data);
          });
    },
    deleteMedicine:function (req, res,next) {
         req.models.medicine.get(req.params.id, function (err, data) {
             if(err)
                return next(err);
            data.remove(function(err){
                if(err)
                    return next(err);                    
                res.send('ok');
             });
         });
    },
    updateMedicine:function (req, res,next) {
         var params = _.pick(req.body, 'name', 'description');        
        req.models.medicine.get(req.params.id, function (err, med) {
        if (err) {
          if (err.code == orm.ErrorCodes.NOT_FOUND)
            res.send(404, "Medicine not found 404_1");
          else
            return next(err);
        }
        if(med){
            med.save(params,function(err){                
                if(err)
                    return next(err);                
                res.send(200, med);
            });           
        }else
            res.send(404, "Medicine not found 404_2");
      });
    }
}