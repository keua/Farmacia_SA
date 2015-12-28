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
app.get('/Employee/:username', controllers.employee.getEmployee);

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

app.get('/PaymentType/:id', controllers.paymenttype.getPaymentType);

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


module.exports = app;