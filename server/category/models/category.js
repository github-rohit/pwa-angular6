const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const dbSchema = new Schema({
	category: {
		type: String,
		required: true
	},
	count: {
		type: Number,
		required: true,
		default: 0
	}
});
    
const Categories = mongoose.model('Categories', dbSchema);

module.exports = {Categories};