var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  id: { type: String },
  hat1: { 
    type: Number, 
    required: [true, "Number of hat type 1 is required"],
    min: 0,
    max: 6,
  },
  hat2: {
    type: Number, 
    required: [true, "Number of hat type 2 is required"],
    min: 0,
    max: 6,
  },
  date: {
		type: String,
		validate: {
			validator: function (date) {
				if (moment(date, 'YYYY-MM-DD', true).format() == "Invalid date")
					return false;
				else return true;
			},
			message: 'Invalid date'
		},
		required: [true, 'Date is required']
  }
});

module.exports = mongoose.model('OrderInfo', OrderSchema);
