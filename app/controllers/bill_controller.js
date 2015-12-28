var orm = require('orm');
var _ = require("lodash");
module.exports = {
        createBill: function (req, res, next) {
            var params = _.pick(req.body, 'mount', 'client_id', 'employee_id');
            var otherParams = _.pick(req.body, 'medicines', 'drugstore_id', 'payments');
            params.date = new Date();

            req.models.bill.create(params, function (err, bill) {
                if (err) {
                    if (Array.isArray(err))
                        return res.send(200, err);
                    else
                        return next(err);
                }
                //Generación de tipo de pago
                if (bill) {
                    otherParams.payments.forEach(function (payment) {
                        var fields = {
                            bill_id: bill.id,
                            paymenttype_id: payment.payment_id,
                            surcharge: payment.surcharge,
                            mount: payment.mount
                        };
                        req.models.payment.create(fields, function (err, payment) {
                            if (err) {
                                console.log(err)
                            }
                            console.log('ok, payments add');
                        });
                    });
                }

                req.models.drugstore.get(otherParams.drugstore_id, function (err, drugstore) {
                    if (err) {
                        if (err.code == orm.ErrorCodes.NOT_FOUND)
                            res.send(404, "Drugstore not found");
                        else
                            return next(err);
                    }
                    //checkMedicines(req, res, next, drugstore, otherParams.medicines);
                    addMedicines(req, res, next, drugstore, bill, otherParams.medicines);
                });
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
                if (bill) {
                    bill.getMedicines(function (err, medicines) {
                        if (err) {
                            if (err.code == orm.ErrorCodes.NOT_FOUND)
                                res.send(404, "Medicines not found in the Bill");
                            else
                                return next(err);
                        }
                        bill.medicines = medicines;
                        res.send(200, bill);
                    });
                } else
                    res.send(404, {});
            });
        },
    }
    /*
        Función para agregar medicinas a una factura
    */
function addMedicines(req, res, next, drugstore, bill, medicines) {
    var params = {};
    var difference = 0;
    if (drugstore && bill) {
        medicines.forEach(function (medicine) {
            drugstore.getMedicines({
                id: medicine.medicine_id
            }, function (err, med) {
                if (err) {
                    if (err.code == orm.ErrorCodes.NOT_FOUND)
                        res.send(404, "Medicine of drugstore: " + drugstore.id + " not found");
                    else
                        return next(err);
                }
                if (med[0]) {
                    difference = med[0].extra.quantity - medicine.quantity;
                    if (difference < 0) {
                        difference = 0;
                        medicine.quantity = med[0].extra.quantity;
                    }
                    bill.addMedicines(med[0], {
                        quantity: medicine.quantity,
                        PriceUnit: med[0].extra.PriceUnit
                    }, function (err) {
                        if (err) {
                            if (Array.isArray(err))
                                return res.send(200, err);
                            else
                                return next(err);
                        }
                    });
                    //update the quantity of medicine in stock of the respective drugstore            
                    req.db.driver.execQuery(
                            "UPDATE drugstore_medicines set quantity = ? WHERE medicines_id=? AND drugstore_id=?", [difference, med[0].id, drugstore.id],
                            function (err, data) {
                                if (err)
                                    console.log(err);
                            }),
                        med[0].extra.quantity = difference;
                    med[0].save(function (err) {
                        if (err)
                            return next(err);
                    });

                } else
                    res.send(404, "Medicine of drugstore: " + drugstore.id + " not found");
            });
        });
        res.send(200, bill);
    } else
        res.send(404, {});
}