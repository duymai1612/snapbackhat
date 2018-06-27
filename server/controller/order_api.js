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
						res.status(404).end('User not found');
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

	// deleteUser: function (req, res) {
	// 	try {
	// 		dataUser.deleteUser({ _id: req.session.user._id }, (err, data) => {
	// 			if (err) res.status(500).send(err).end();
	// 			req.session.destroy();
	// 			res.status(200).send('Delete succeeded').end();
	// 		})
	// 	} catch (ex) {
	// 		res.status(500).send(ex).end();
	// 	}
	// }
}