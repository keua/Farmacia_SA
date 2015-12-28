module.exports = {
    client:             require('./client_controller'),
    medicine:           require('./medicine_controller'),
    drugstore:          require('./drugstore_controller'),
    drugstore_medicine: require('./drugstore_medicine_controller'),
    employee:           require('./employee_controller'),
    bill:               require('./bill_controller'),
    paymenttype:        require('./payment_type_controller'),
    payment:            require('./payment_controller')
};