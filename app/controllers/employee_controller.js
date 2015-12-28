var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createEmployee: function (req, res, next) {
        var params = _.pick(req.body, 'name', 'lastName', 'phoneNumber', 'birth', 'address', 'username', 'password', 'drugstore_id');
        req.models.employee.create(params, function (err, employee) {
            if (err) {
                if (Array.isArray(err))
                    return res.send(200, err);
                else
                    return next(err);
            }
            return res.send(200, employee);
        });
    },
    getEmployee: function (req, res, next) {
        req.models.employee.find({
            username: req.params.username
        }, function (err, employee) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Employee not found");
                else
                    return next(err);
            }
            if (employee[0]) {
                employee[0].getDrugstore(function (err, drugstore) {
                    employee[0].drugstore = drugstore;
                    res.send(200, employee[0]);
                });
            } else
                res.send(404, {});
        });
    },

    updateEmployee: function (req, res, next) {
        var params = _.pick(req.body, 'name', 'lastName', 'phoneNumber', 'birth', 'address', 'username', 'password', 'drugstore_id');
        req.models.employee.get(req.params.id, function (err, employee) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "employee not found 1");
                else
                    return next(err);
            }
            if (employee) {
                employee.save(params, function (err, u) {
                    if (err)
                        return next(err);
                    res.send(200, employee);
                });
            } else
                res.send(404, {});
        });
    }
}