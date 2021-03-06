var express = require('express');
var app = express.Router();
var controllers = require('../app/controllers');
/* 
    GET home page.
    Redirecciona a la página index.ejs dentro de la carpeta views
*/
app.get('/', function (req, res, next) {
    res.render('pages/index', {
        user: null
    });
});

/*
    Client
*/
app.get('/Client/:nit', controllers.client.getClient);

app.get('/ClientBills/:nit', controllers.client.getClientBills);

app.post('/Client', controllers.client.createClient);

app.delete('/Client/:id', controllers.client.deleteClient);

app.put('/Client/:id', controllers.client.updateClient);
/*
    Employee
*/
app.get('/Employee/:username/:password', controllers.employee.getEmployee);

app.post('/Employee', controllers.employee.createEmployee);

app.put('/Employee/:id', controllers.employee.updateEmployee);

/*
    Medicine
*/
app.post('/Medicine', controllers.medicine.createMedicine);

app.delete('/Medicine/:id', controllers.medicine.deleteMedicine);

app.put('/Medicine/:id', controllers.medicine.updateMedicine);

/*
    Drugstore
*/
app.get('/Drugstore/:id', controllers.drugstore.getDrugstore);

app.get('/Drugstore', controllers.drugstore.getAllDrugstore);

app.get('/DrugstoreEmployees/:id', controllers.drugstore.getDrugstoreEmployes);

app.post('/Drugstore', controllers.drugstore.createDrugstore);

app.delete('/Drugstore/:id', controllers.drugstore.deleteDrugstore);

app.put('/Drugstore/:id', controllers.drugstore.updateDrugstore);

/*
    Drugstore and Medicines
*/
app.post('/DrugstoreMedicine', controllers.drugstore_medicine.addMedicine);

app.get('/DrugstoreMedicine', controllers.drugstore_medicine.getAllDrugstoreMedicine);

app.get('/DrugstoreMedicine/:id', controllers.drugstore_medicine.getDrugstoreMedicine);

app.delete('/DrugstoreMedicine/:drugstore_id/:medicine_id', controllers.drugstore_medicine.deleteDrugstoreMedicine);

app.put('/DrugstoreMedicine/:drugstore_id/:medicine_id', controllers.drugstore_medicine.updateDrugstoreMedicine);
/*
    Bill
*/
app.get('/Bill/:id', controllers.bill.getBill);

app.post('/Bill', controllers.bill.createBill);

app.post('/Bill', controllers.bill.createBill);

/*
    PaymentType
*/
app.post('/PaymentType', controllers.paymenttype.createPaymentType);

app.get('/PaymentType', controllers.paymenttype.getPaymentType);

app.delete('/PaymentType/:id', controllers.paymenttype.deletePaymentType);

app.put('/PaymentType/:id', controllers.paymenttype.updatePaymentType);

/*
    Payment
*/

app.post('/Payment', controllers.payment.createPayment);

app.get('/Payment/:id', controllers.payment.getPayment);

app.get('/PaymentBill/:bill_id', controllers.payment.getPaymentByBill);

app.delete('/Payment/:id', controllers.payment.deletePayment);

app.put('/Payment/:id', controllers.payment.updatePayment);


/*
    Operator
*/
app.get('/Operator/:name', controllers.operator.getOperator);

app.post('/Operator', controllers.operator.createOperator);

app.put('/Operator/:id', controllers.operator.updateOperator);

/*
    CallCenter
*/
app.get('/CallCenter/:id', controllers.callcenter.getCallCenter);

app.get('/GetCallCenter', controllers.callcenter.getAllCallCenter);

app.get('/CallCenterOperator/:id', controllers.callcenter.getCallCenterOperators);

app.post('/CallCenter', controllers.callcenter.createCallCenter);

app.delete('/CallCenter/:id', controllers.callcenter.deleteCallCenter);

app.put('/CallCenter/:id', controllers.callcenter.updateCallCenter);

/*
    Order
*/

app.get('/OrderMedicines/:id', controllers.order.getMedicinesbyOrder);

app.get('/OrderDrugstore/:drugstore_id', controllers.order.getOrderbySucursal);

app.get('/AllOrder', controllers.order.getAllOrder);

app.get('/Order/:id', controllers.order.getOrder);

app.post('/Order', controllers.order.createOrder);

app.put('/OrderMedicine/:order_id/:medicine_id', controllers.order.updateOrderMedicine);

app.delete('/OrderMedicine/:order_id/:medicine_id', controllers.order.deleteOrderMedicine);

app.delete('/OrderDelete/:order_id', controllers.order.deleteOrder);

module.exports = app;