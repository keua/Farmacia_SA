var orm = require('orm');
var _ = require("lodash");
module.exports = {
        createOrder: function (req, res, next) {
            var params = _.pick(req.body, 'totalAmount','isCanceled','dateEmited','client_id', 'operator_id','drugstore_id');
            var otherParams = _.pick(req.body, 'medicines', 'drugstore_id');
            params.date = new Date();

            req.models.order.create(params, function (err, order) {
                if (err) {
                    if (Array.isArray(err))
                        return res.send(200, err);
                    else
                        return next(err);
                }

                req.models.drugstore.get(otherParams.drugstore_id, function (err, drugstore) {
                    if (err) {
                        if (err.code == orm.ErrorCodes.NOT_FOUND)
                            res.send(404, "Drugstore not found");
                        else
                            return next(err);
                    }
                    addMedicines(req, res, next, drugstore, order, otherParams.medicines);
                });
            });
        },
        getOrderbySucursal:function (req, res, next) {
                    req.models.order.find({
                    drugstore_id: req.params.drugstore_id
                }, function (err, order) {
                    if (err) {
                        if (err.code == orm.ErrorCodes.NOT_FOUND)
                            res.send(404, "Client not found");
                        else
                            return next(err);
                    }
                        var lista=[];
                        order.forEach(function (order) {
                        req.models.order.get(order.id, function (err, order) {
                            if (err) {
                                if (err.code == orm.ErrorCodes.NOT_FOUND)
                                    res.send(404, "oder not found");
                                else
                                    return next(err);
                            }
                            if (order) {
                                order.getMedicines(function (err, medicines) {
                                    if (err) {
                                        if (err.code == orm.ErrorCodes.NOT_FOUND)
                                            res.send(404, "Medicines not found in the Order");
                                        else
                                            return next(err);
                                    }
                                    order.medicines = medicines;                           
                                });
                                res.send(200, order);
                            } else
                                res.send(404, 'Order not found 2');
                        });
                     });
                });
        },

        getOrder: function (req, res, next) {
            req.models.order.get(req.params.id, function (err, order) {
                if (err) {
                    if (err.code == orm.ErrorCodes.NOT_FOUND)
                        res.send(404, "oder not found");
                    else
                        return next(err);
                }
                if (order) {
                    order.getMedicines(function (err, medicines) {
                        if (err) {
                            if (err.code == orm.ErrorCodes.NOT_FOUND)
                                res.send(404, "Medicines not found in the Order");
                            else
                                return next(err);
                        }
                        order.medicines = medicines;
                        res.send(200, order);
                    });
                } else
                    res.send(404, 'Order not found 2');
            });
        },
        updateOrderMedicine: function (req, res, next) {
        var params = _.pick(req.body, 'quantity', 'PriceUnit');
         req.models.order.get(req.params.order_id, function (err,order) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Order not found 1");
                else
                    return next(err);
            } else {
                order.getMedicines({id: req.params.medicine_id},
                    function (err, medicineFromOrder) {
                    if (err) {
                        if (err.code == orm.ErrorCodes.NOT_FOUND)
                            res.send(404, "Medicine not found 1");
                        else
                            return next(err);
                    }
                    req.models.drugstore.get(medicineFromOrder[0].drugstoreId,
                        function (err, drugstore) 
                        {
                            if (err) {
                                if (err.code == orm.ErrorCodes.NOT_FOUND)
                                    res.send(404, "Drugstore not found 1");
                                else
                                    return next(err);
                            } 
                            else 
                            {
                                drugstore.getMedicines({id: req.params.medicine_id},     
                                function (err, medicineToUpdate) 
                                {
                                    if (err) 
                                    {
                                        if (err.code == orm.ErrorCodes.NOT_FOUND)
                                            res.send(404, "Medicine not found 1");
                                        else
                                            return next(err);
                                    }
                                    var difference = medicineFromOrder[0].quantity - params.quantity;
                                    difference = medicineToUpdate[0].quantity + difference;             
                                    req.db.driver.execQuery(
                                      "UPDATE drugstore_medicines set quantity = ?, PriceUnit=? WHERE medicines_id=? AND drugstore_id=?",
                                      [difference,params.PriceUnit, medicineFromOrder[0].id, medicineFromOrder[0].drugstoreId],
                                      function (err, data) { 
                                          if(err)
                                              console.log(err);
                                    })
                                    
                                    req.db.driver.execQuery(
                                      "UPDATE order_medicines set quantity = ?, PriceUnit=? WHERE medicines_id=? AND drugstoreId=?",
                                      [params.quantity,params.PriceUnit, medicineFromOrder[0].id, medicineFromOrder[0].drugstoreId],
                                      function (err, data) { 
                                          if(err)
                                              console.log(err);
                                    });

                                });
                            }
                        });                         
                    return res.send(200, medicineFromOrder[0]);
                });
            }
        });
    },

    deleteOrderMedicine: function (req, res, next) 
    {
        req.models.medicine.get(req.params.medicine_id, function (err, medicine) {
            if (err) 
            {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Medicine not found 1");
                else
                    return next(err);
            } 
            else 
            {
                req.models.order.get(req.params.order_id, function (err,order) 
                {
                    if (err) {
                        if (err.code == orm.ErrorCodes.NOT_FOUND)
                            res.send(404, "Order not found 1");
                        else
                            return next(err);
                    } 
                    else 
                    {
                        order.getMedicines({medicines_id: req.params.medicine_id},
                            function (err, medicineFromOrder) 
                            {
                                if (err) 
                                {
                                    if (err.code == orm.ErrorCodes.NOT_FOUND)
                                        res.send(404, "Medicine not found 1");
                                    else
                                        return next(err);
                                }
                                req.models.drugstore.get(medicineFromOrder[0].drugstoreId,
                                    function (err, drugstore) 
                                    {
                                        if (err) {
                                            if (err.code == orm.ErrorCodes.NOT_FOUND)
                                                res.send(404, "Drugstore not found 1");
                                            else
                                                return next(err);
                                        } 
                                        else 
                                        {
                                            drugstore.getMedicines({id: req.params.medicine_id},     
                                            function (err, medicineToUpdate) 
                                            {
                                                if (err) 
                                                {
                                                    if (err.code == orm.ErrorCodes.NOT_FOUND)
                                                        res.send(404, "Medicine not found 1");
                                                    else
                                                        return next(err);
                                                }
                                                var newQuantity = medicineToUpdate[0].quantity +  medicineFromOrder[0].quantity; 
                                                req.db.driver.execQuery
                                                (
                                                "UPDATE drugstore_medicines set quantity = ? WHERE medicines_id=? AND drugstore_id=?", 
                                                [newQuantity, medicineFromOrder[0].id, medicineFromOrder[0].drugstoreId],
                                                function (err, data) {
                                                    if (err)
                                                        console.log(err);
                                                });                                                
                                                req.models.order(req.params.order_id).removeMedicines(medicine,function (err) {
                                                    if (err) {
                                                        if (Array.isArray(err))
                                                            return res.send(200, err);
                                                        else
                                                            return next(err);
                                                    }
                                                    return res.send(200, 'ok');
                                                });
                                            });
                                        }
                                    });
 
                                });
                            }
                        });
            }
        });
    }
    }
    /*
        Función para agregar medicinas a una factura
    */
function addMedicines(req, res, next, drugstore, order, medicines) {
    var params = {};
    var difference = 0;
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
                order.addMedicines(med[0], {
                    quantity: medicine.quantity,
                    PriceUnit: med[0].extra.PriceUnit,
                    drugstoreId: drugstore.id
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
    res.send(200, order);
}

function updateMedicines(){}
function deleteMedicines(){}