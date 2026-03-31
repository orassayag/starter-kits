const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
	id: {
		type: Number,
		default: null,
		required: true,
		unique: true
	},
	name: {
		type: String,
		default: null,
		required: false,
		trim: true,
		unique: true
	}
});

GenreSchema.set('autoIndex', false);
GenreSchema.index({ id: 1 }, { unique: true });
module.exports = mongoose.model('Genre', GenreSchema);