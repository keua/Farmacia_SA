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

    updateDrugstore: function (req, res, next) {
        var params = _.pick(req.body, 'name', 'phoneNumber', 'address');
        req.models.drugstore.get(req.params.id, function (err, drugstore) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Drugsotre not found");
                else
                    return next(err);
            }
            if (drugstore) {
                drugstore.save(params, function (err) {
                    if (err)
                        return next(err);
                    res.send(200, drugstore);
                });
            } else
                res.send(404, "Drugstore not found");
        });
    },

    deleteDrugstore: function (req, res, next) {
        req.models.drugstore.get(req.params.id, function (err, drugstore) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Drugstore not found");
                else
                    return next(err);
            }
            if (drugstore) {
                drugstore.remove(function (err) {
                    if (err)
                        return next(err);
                    res.send(200, 'ok');
                });
            } else
                res.send(404, "Drugstore not found");
        });
    }
}