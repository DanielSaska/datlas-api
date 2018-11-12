'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Analysis = new Schema({
	//Sequence details
	addons: { type: [{
		title: { type: String, required: true },
		subtitle: { type: String, required: true },
		data: { type: Object, required: false },
		plot: { type: Object, required: false },
		priority: { type: Number, required: true },
		html: { type: String, required: true }
	}], required: false },

	//Errors
	err: {type: [String], required: false },
},);

var AnalysisModel = mdb.model('analysis', Analysis, 'analysis');
module.exports = AnalysisModel
