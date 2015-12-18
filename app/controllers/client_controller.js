var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createClient: function(req, res, next) {
      var params = _.pick(req.body, 'name', 'lastName', 'nit', 'phoneNumber', 'birth','address');
       req.models.client.create(params, function (err, client) {
            if(err) {
              if(Array.isArray(err))
                return res.send(200, err);
              else 
                return next(err);                
            }
            return res.send(200);
          });
    },
    getClient: function(req, res, next) {
      req.models.client.find({nit: req.params.nit}, function (err, client) {
        if (err) {
          if (err.code == orm.ErrorCodes.NOT_FOUND)
            res.send(404, "Client not found");
          else
            return next(err);
        }
        res.send(200, client);
      });
    },
    
    updateClient: function(req, res, next){
        var params = _.pick(req.body, 'name', 'lastName', 'nit', 'phoneNumber', 'birth','address');
        req.models.client.get(req.params.id, function (err, client) {
        if (err) {
          if (err.code == orm.ErrorCodes.NOT_FOUND)
            res.send(404, "Client not found");
          else
            return next(err);
        }
        if(client){
            client.save(params,function(err){
                if(err)
                    return next(err);                    
                res.send(200, client);
            });           
        }
        res.send(404, "Client not found");
      });
    },
    
    deleteClient: function(req, res, next){
      req.models.client.get(req.params.id, function (err, client) {
        if (err) {
          if (err.code == orm.ErrorCodes.NOT_FOUND)
            res.send(404, "Client not found");
          else
            return next(err);
        }
        if(client){
            client.remove(function(err){
                if(err)
                    return next(err);                    
                res.send(200, 'ok');
            });            
        }
        res.send(404, "Client not found");
      });
    }
}