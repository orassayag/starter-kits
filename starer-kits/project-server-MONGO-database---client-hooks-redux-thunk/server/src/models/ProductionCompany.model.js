const mongoose = require('mongoose');

const ProductionCompanySchema = new mongoose.Schema({
	id: {
		type: Number,
		default: null,
		required: true,
		unique: true
	},
	logo_path: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	name: {
		type: String,
		default: null,
		required: true,
		trim: true
	},
	origin_country: {
		type: String,
		default: null,
		required: false,
		trim: true
	}
});

ProductionCompanySchema.set('autoIndex', false);
ProductionCompanySchema.index({ id: 1, name: 1 }, { unique: true });
module.exports = mongoose.model('ProductionCompany', ProductionCompanySchema);