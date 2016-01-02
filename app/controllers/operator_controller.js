var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createOperator: function (req, res, next) {
        var params = _.pick(req.body, 'name','callcenter_id');
        req.models.operator.create(params, function (err, operator) {
            if (err) {
                if (Array.isArray(err))
                    return res.send(200, err);
                else
                    return next(err);
            }
            return res.send(200, operator);
        });
    },
    getOperator: function (req, res, next) {
        req.models.operator.find({
            name: req.params.name
        }, function (err, operator) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Operator not found");
                else
                    return next(err);
            }
            res.send(200, operator);
        });
    },

    updateOperator: function (req, res, next) {
        var params = _.pick(req.body, 'name','callcenter_id');
        req.models.operator.get(req.params.id, function (err, operator) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Operator not found 1");
                else
                    return next(err);
            }
            if (operator) {
                operator.save(params, function (err, u) {
                    if (err)
                        return next(err);
                    res.send(200, operator);
                });
            } else
                res.send(404, "Operator not found 2");
        });
    }    
}