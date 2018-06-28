var dataOrder = require('./data_order');

module.exports = {
	createOrder: function (req, res) {
		try {
			var newOrder = req.body;
			dataOrder.createOrder(newOrder, (err, data) => {
        if (err) res.status(500).send(err).end();
        else res.status(200).end('Create order successfully');
      });
		} catch (ex) {
			res.status(500).send(ex).end();
		}
	},

	getOrders: function (req, res) {
		try {
			dataOrder.findOrders({}, function (err, data) {
				if (err) {
					res.status(500).end(err);
				}
				else {
					if (data.length <= 0) {
						res.status(404).end('Order not found');
					}
					else {
						var orders = data;
						res.status(200).end(JSON.stringify(orders));
					}
				}
			})
		} catch (err) {
			res.status(500).end(err);
		}
	},

	getNewOrder: function (req, res) {
		try {
			dataOrder.findNewOrder({ neworder: true }, { neworder: false }, function (err, data) {
				if (err) {
					res.status(500).end(err);
				}
				else {
					if (data.length <= 0) {
						res.status(404).end('Order not found');
					}
					else {
						var order = data;
						res.status(200).end(`A${order.hat1}B${order.hat2}`);
					}
				}
			})
		} catch (err) {
			res.status(500).end(err);
		}
	}
}