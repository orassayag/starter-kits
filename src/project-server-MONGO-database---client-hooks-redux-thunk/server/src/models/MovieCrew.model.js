const mongoose = require('mongoose');

const MovieCrewSchema = new mongoose.Schema({
	crewId: {
		type: Number,
		default: null,
		required: true
	},
	movieId: {
		type: Number,
		default: null,
		required: true
	},
	job: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	department: {
		type: String,
		default: null,
		required: false,
		trim: true
	}
});

MovieCrewSchema.set('autoIndex', false);
MovieCrewSchema.index({ crewId: 1, movieId: 1 }, { unique: true });
module.exports = mongoose.model('MovieCrew', MovieCrewSchema);