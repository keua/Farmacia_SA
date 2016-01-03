var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createCallCenter: function (req, res, next) {
        var params = _.pick(req.body, 'name' );
        req.models.callcenter.create(params, function (err, callcenter) {
            if (err) {
                if (Array.isArray(err))
                    return res.send(200, err);
                else
                    return next(err);
            }
            return res.send(200, callcenter);
        });
    },
    getCallCenter: function (req, res, next) {
        req.models.callcenter.get(req.params.id, function (err, callcenter) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Call Center not found");
                else
                    return next(err);
            }
            if (callcenter)
                res.send(200, callcenter);
            else
                res.send(404, "Call Center not found");

        });
    },
    
    getCallCenterOperators: function (req, res, next) {
        req.models.callcenter(req.params.id).getOperators(function (err, operators) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Call Center not found");
                else
                    return next(err);
            }
            if (operators)
                res.send(200, operators);
            else
                res.send(404, "Operators not found");

        });
    },
    
    getAllCallCenter: function (req, res, next) {
        req.models.callcenter.find( function (err, callcenter) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Call Center not found");
                else
                    return next(err);
            }
            if (callcenter)
                res.send(200, callcenter);
            else
                res.send(404, "CallCenter not found");

        });
    },

    updateCallCenter: function (req, res, next) {
        var params = _.pick(req.body, 'name', 'isWorking');
        req.models.callcenter.get(req.params.id, function (err, callcenter) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "CallCenter not found");
                else
                    return next(err);
            }
            if (callcenter) {
                callcenter.save(params, function (err) {
                    if (err)
                        return next(err);
                    res.send(200, callcenter);
                });
            } else
                res.send(404, "CallCenter not found");
        });
    },

    deleteCallCenter: function (req, res, next) {
        req.models.callcenter.get(req.params.id, function (err, callcenter) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "CallCenter not found");
                else
                    return next(err);
            }
            if (callcenter) {
                callcenter.remove(function (err) {
                    if (err)
                        return next(err);
                    res.send(200, 'ok');
                });
            } else
                res.send(404, "CallCenter not found");
        });
    }
}