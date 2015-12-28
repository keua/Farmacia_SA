var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createPayment: function (req, res, next) {
        var params = _.pick(req.body, 'mount', 'surcharge', 'paymenttype_id', 'bill_id');
        req.models.payment.create(params, function (err, data) {
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
    deletePayment: function (req, res, next) {
        req.models.payment.get(req.params.id, function (err, data) {
            if (err)
                return next(err);
            data.remove(function (err) {
                if (err)
                    return next(err);
                res.send('ok');
            });
        });
    },
    getPayment: function (req, res, next) {
        req.models.payment.get(req.params.id, function (err, data) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Payment not found");
                else
                    return next(err);
            }
            if (data)
                res.send(200, data);
            else
                res.send(404, {});
        });
    },
    getPaymentByBill: function (req, res, next) {
        req.models.payment.findByBill(req.params.bill_id, function (err, data) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Payment not found");
                else
                    return next(err);
            }
            if (data)
                res.send(200, data);
            else
                res.send(404, {});
        });
    },
    updatePayment: function (req, res, next) {
        var params = _.pick(req.body, 'mount', 'surcharge', 'paymenttype_id', 'bill_id');
        req.models.payment.get(req.params.id, function (err, med) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Payment not found 404_1");
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