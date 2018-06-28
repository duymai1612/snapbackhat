const express = require('express');
const orderApi = require('./controller/order_api');

module.exports = function(app) {
    var router = express.Router()
    
    router.get('/orders', orderApi.getOrders);
    router.post('/orders', orderApi.createOrder);
    router.get('/orders/neworder', orderApi.getNewOrder);

    app.use('/api', router)
}