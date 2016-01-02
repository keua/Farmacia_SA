var orm = require('orm');
var _ = require("lodash");
module.exports = {
    addMedicine: function (req, res, next) {
        var params = _.pick(req.body, 'quantity', 'PriceUnit');
        req.models.medicine.get(req.body.medicine_id, function (err, medicine) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Medicine not found 1");
                else
                    return next(err);
            } else {
                req.models.drugstore(req.body.drugstore_id).addMedicines(medicine,params, function (err) {
                    if (err) {
                        if (Array.isArray(err))
                            return res.send(200, err);
                        else
                            return next(err);
                    }
                    return res.send(200, medicine);
                });
            }
        });
    },
    
    getDrugstoreMedicine: function (req, res, next) {
        req.models.drugstore(req.params.id).getMedicines(function (err,medicines) {
            if (err) {
                if (Array.isArray(err))
                    return res.send(200, err);
                else
                    return next(err);
            }
            return res.send(200, medicines);
        });
    },

    updateDrugstoreMedicine: function (req, res, next) {
        var params = _.pick(req.body, 'quantity', 'PriceUnit');
         req.models.drugstore.get(req.params.drugstore_id, function (err,drugstore) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Drugstore not found 1");
                else
                    return next(err);
            } else {
                drugstore.getMedicines({id: req.params.medicine_id},function (err, medicine) {
                    if (err) {
                        if (err.code == orm.ErrorCodes.NOT_FOUND)
                            res.send(404, "Medicine not found 1");
                        else
                            return next(err);
                    }
                    req.db.driver.execQuery(
                      "UPDATE drugstore_medicines set quantity = ?, PriceUnit=? WHERE medicines_id=? AND drugstore_id=?",
                      [params.quantity,params.PriceUnit, medicine[0].id, drugstore.id],
                      function (err, data) { 
                          if(err)
                              console.log(err);
                    });
                    medicine[0].extra.quantity = params.quantity;
                    medicine[0].extra.PriceUnit =  params.PriceUnit;
                    return res.send(200, medicine[0]);
                    /*medicine[0].save(function(err){
                        if (err) 
                            return next(err);
                        return res.send(200, medicine[0]);
                    });*/
                });
            }
        });
    },

    deleteDrugstoreMedicine: function (req, res, next) {
        req.models.medicine.get(req.params.medicine_id, function (err, medicine) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Medicine not found 1");
                else
                    return next(err);
            } else {
                req.models.drugstore(req.params.drugstore_id).removeMedicines(medicine,function (err) {
                    if (err) {
                        if (Array.isArray(err))
                            return res.send(200, err);
                        else
                            return next(err);
                    }
                    return res.send(200, 'ok');
                });
            }
        });
    }
}