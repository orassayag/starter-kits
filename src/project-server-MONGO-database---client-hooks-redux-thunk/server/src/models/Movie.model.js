const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
	id: {
		type: Number,
		default: null,
		required: true,
		unique: true
	},
	adult: {
		type: Boolean,
		default: false,
		required: true
	},
	poster_path: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	budget: {
		type: Number,
		default: 0,
		required: false
	},
	genres: {
		type: Array,
		default: [],
		require: false
	},
	homepage: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	imdb_id: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	original_language: {
		type: String,
		default: null,
		required: true,
		trim: true
	},
	original_title: {
		type: String,
		default: null,
		required: true,
		trim: true
	},
	overview: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	popularity: {
		type: Number,
		default: 0,
		required: false
	},
	production_country: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	release_date: {
		type: Date,
		default: null,
		required: false,
		trim: true
	},
	revenue: {
		type: Number,
		default: 0,
		required: false
	},
	runtime: {
		type: Number,
		default: 0,
		required: false
	},
	spoken_language: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	status: {
		type: String,
		default: null,
		required: true,
		trim: true
	},
	tagline: {
		type: String,
		default: null,
		required: false,
		trim: true
	},
	title: {
		type: String,
		default: null,
		required: true,
		unique: true,
		trim: true
	},
	video: {
		type: Boolean,
		default: false,
		required: true
	},
	vote_average: {
		type: Number,
		default: 0,
		required: false
	},
	vote_count: {
		type: Number,
		default: 0,
		required: false
	},
	youtubeKey: {
		type: String,
		default: null,
		required: false,
		trim: true
	}
});

MovieSchema.set('autoIndex', false);
MovieSchema.index({ id: 1, title: 1 }, { unique: true });
module.exports = mongoose.model('Movie', MovieSchema);