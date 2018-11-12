'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperimentDetials = new Schema({
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

var ExperimentDetailsModel = mdb.model('experiment_details', ExperimentDetials);
module.exports = ExperimentDetailsModel
