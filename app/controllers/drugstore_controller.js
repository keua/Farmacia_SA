var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createDrugstore: function (req, res, next) {
        var params = _.pick(req.body, 'name', 'phoneNumber', 'address');
        req.models.drugstore.create(params, function (err, drugstore) {
            if (err) {
                if (Array.isArray(err))
                    return res.send(200, err);
                else
                    return next(err);
            }
            return res.send(200, drugstore);
        });
    },
    getDrugstore: function (req, res, next) {
        req.models.drugstore.get(req.params.id, function (err, drugstore) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Drugstore not found");
                else
                    return next(err);
            }
            if (drugstore)
                res.send(200, drugstore);
            else
                res.send(404, {});

        });
    },

    getDrugstoreEmployes: function (req, res, next) {
        req.models.drugstore(req.params.id).getEmployees(function (err, employees) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Drugstore not found");
                else
                    return next(err);
            }
            if (employees)
                res.send(200, employees);
            else
                res.send(404, {});

        });
    },

    getAllDrugstore: function (req, res, next) {
        req.models.drugstore.find(function (err, drugstore) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Drugstore not found");
                else
                    return next(err);
            }
            if (drugstore)
                res.send(200, drugstore);
            else
                res.send(404, {});

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
                res.send(404, {});
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
                res.send(404, {});
        });
    }
}