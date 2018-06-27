var mongoose = require('mongoose')

var Order = require('../schemas/order')

exports.findOrders = function (data, callback) {
  Order.find(data, function (err, data) {
    if (callback) callback(err, data);
  })
}

exports.createOrder = function (data, callback) {
  var newOrder = new Order(data);
  newOrder.save(function (err, data) {
    if (callback) callback(err, data);
  })
}
