var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createPaymentType: function (req, res, next) {
        var params = _.pick(req.body, 'name', 'surcharge');
        req.models.paymenttype.create(params, function (err, data) {
            if (err) {
                if (Array.isArray(err)) {
                    return res.send(200, err);
                } else {
                    return next(err);
                }
            }
            return res.send(200, data);
        });
    },
    deletePaymentType: function (req, res, next) {
        req.models.paymenttype.get(req.params.id, function (err, data) {
            if (err)
                return next(err);
            data.remove(function (err) {
                if (err)
                    return next(err);
                res.send('ok');
            });
        });
    },
    getPaymentType: function (req, res, next) {
        req.models.paymenttype.find(function (err, data) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "PaymentType not found");
                else
                    return next(err);
            }
            if(data)
                res.send(200, data);
            else
                res.send(404, {});
        });
    },
    updatePaymentType: function (req, res, next) {
        var params = _.pick(req.body, 'name', 'surcharge');
        req.models.paymenttype.get(req.params.id, function (err, med) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "PaymentType not found 404_1");
                else
                    return next(err);
            }
            if (med) {
                med.save(params, function (err) {
                    if (err)
                        return next(err);
                    res.send(200, med);
                });
            } else
                res.send(404, {});
        });
    }
}