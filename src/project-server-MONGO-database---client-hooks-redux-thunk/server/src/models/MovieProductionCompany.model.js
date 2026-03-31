const mongoose = require('mongoose');

const MovieProductionCompanySchema = new mongoose.Schema({
	productionCompanyId: {
		type: Number,
		default: null,
		required: true
	},
	movieId: {
		type: Number,
		default: null,
		required: true
	}
});

MovieProductionCompanySchema.set('autoIndex', false);
MovieProductionCompanySchema.index({ productionCompanyId: 1, movieId: 1 }, { unique: true });
module.exports = mongoose.model('MovieProductionCompany', MovieProductionCompanySchema);