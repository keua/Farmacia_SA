var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createBill: function (req, res, next) {
        var params = _.pick(req.body, 'mount', 'client_id', 'employee_id');
        params.date = new Date();
        
        req.models.bill.create(params, function (err, bill) {
            if (err) {
                if (Array.isArray(err))
                    return res.send(200, err);
                else
                    return next(err);
            }
            return res.send(200, bill);
        });
    },
    getBill: function (req, res, next) {
        req.models.bill.get(req.params.id, function (err, bill) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "bill not found");
                else
                    return next(err);
            }
            res.send(200, bill);
        });
    },
}