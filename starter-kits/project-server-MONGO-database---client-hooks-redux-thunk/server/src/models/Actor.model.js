const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
	id: {
		type: Number,
		default: null,
		required: true,
		unique: true
	},
	cast_id: {
		type: Number,
		default: 0,
		required: false
	},
	gender: {
		type: Number,
		default: 1,
		required: false
	},
	name: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	profile_path: {
		type: String,
		default: null,
		required: false,
		trim: true
	}
});

ActorSchema.set('autoIndex', false);
ActorSchema.index({ id: 1, name: 1 }, { unique: true });
module.exports = mongoose.model('Actor', ActorSchema);