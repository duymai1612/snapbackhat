var mongoose = require('mongoose')

var Order = require('../schemas/order')

exports.findOrders = function (data, callback) {
  Order.find(data, function (err, data) {
    if (callback) callback(err, data);
  })
}

exports.findNewOrder = function (condition, data, callback) {
  Order.findOneAndUpdate(condition, data, { returnNewDocument: true }, function (err, model) {
    if (callback) callback(err, model);
  })
}

exports.createOrder = function (data, callback) {
  var newOrder = new Order(data);
  newOrder.save(function (err, data) {
    if (callback) callback(err, data);
  })
}
