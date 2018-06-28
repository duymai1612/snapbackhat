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
					res.status(200).end(JSON.stringify(data));
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
					if (!data) {
						res.status(200).end('');
					} else {
						res.status(200).end(`A${data.hat1}B${data.hat2}`);
					}
				}
			})
		} catch (err) {
			res.status(500).end(err);
		}
	},

	deleteAllOrders: function (req, res) {
		try {
			dataOrder.deleteAllOrders((err, data) => {
				if (err) res.status(500).send(err).end();
				res.status(200).send('Delete succeeded').end();
			})
		} catch (ex) {
			res.status(500).send(ex).end();
		}
	}
}