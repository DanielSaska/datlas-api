'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagDetials = new Schema({
	name: {type: [String], required: true, index: { unique: true } },
	recordings: {type: [Schema.ObjectId], required: false},

	analysis: { type: {
		addons: { type: [{
			title: { type: String, required: true },
			subtitle: { type: String, required: true },
			data: { type: Object, required: false },
			plot: { type: Object, required: false },
			priority: { type: Number, required: true },
			html: { type: String, required: true }
		}], required: true },
	}, required: false }

});

var TagDetailsModel = mdb.model('tag_details', TagDetials);
module.exports = TagDetailsModel
