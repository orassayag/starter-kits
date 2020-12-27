const mongoose = require('mongoose');

const MovieActorSchema = new mongoose.Schema({
	actorId: {
		type: Number,
		default: null,
		required: true
	},
	movieId: {
		type: Number,
		default: null,
		required: true
	},
	character: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	order: {
		type: Number,
		default: 0,
		required: false
	}
});

MovieActorSchema.set('autoIndex', false);
MovieActorSchema.index({ actorId: 1, movieId: 1 }, { unique: true });
module.exports = mongoose.model('MovieActor', MovieActorSchema);