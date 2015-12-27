var orm = require('orm');
var _ = require("lodash");
module.exports = {
    createBill: function (req, res, next) {
        var params = _.pick(req.body, 'mount', 'client_id', 'employee_id');
        var otherParams = _.pick(req.body,  'medicines', 'drugstore_id');
        params.date = new Date();
        
        req.models.bill.create(params, function (err, bill) {
            if (err) {
                if (Array.isArray(err))
                    return res.send(200, err);
                else
                    return next(err);
            }
            
            req.models.drugstore.get(otherParams.drugstore_id, function(err, drugstore){
                if (err) {
                    if (err.code == orm.ErrorCodes.NOT_FOUND)
                        res.send(404, "Drugstore not found");
                    else
                        return next(err);
                }
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
            res.send(200, bill);
        });
    },
}

/*
    Función para agregar medicinas a una factura
*/
function addMedicines(req, res, next, drugstore, bill, medicines){
    var params={};
    medicines.forEach(function(medicine){
        drugstore.getMedicines({id: medicine.medicine_id}, function (err, med) {
            if (err) {
                if (err.code == orm.ErrorCodes.NOT_FOUND)
                    res.send(404, "Medicine of drugstore: "+drugstore.id+" not found");
                else
                    return next(err);
            }
            bill.addMedicines(med[0], {quantity: medicine.quantity, 
                                       PriceUnit: med[0].extra.PriceUnit}, 
                              function(err){
                if (err) {
                    if (Array.isArray(err))
                        return res.send(200, err);
                    else
                        return next(err);
                }
            });
            //update de quantity of medicine in stock of the respective drugstore  
            req.db.driver.execQuery(
              "UPDATE drugstore_medicines set quantity = ? WHERE medicines_id=? AND drugstore_id=?",
              [med[0].extra.quantity - medicine.quantity, med[0].id, drugstore.id],
              function (err, data) { 
                  if(err)
                      console.log(err);
            }),
            med[0].extra.quantity = med[0].extra.quantity - medicine.quantity;
            med[0].save(function(err){
                if (err) 
                    return next(err);
            });            
        });
    });
    res.send(200,bill);
}