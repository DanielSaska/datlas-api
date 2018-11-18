'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperimentAnalysis = new Schema({
	exp_name: { type: String, required: true, index: true },
	commit: { type: String, required: true },
	data: { type: {
		title: { type: String, required: true },
		subtitle: { type: String, required: true },
		data: { type: Object, required: false },
		plot: { type: Object, required: false },
		priority: { type: Number, required: false },
		html: { type: String, required: false }
	}, required: true },
},);

var ExperimentAnalysisModel = mdb.model('experiment_analysis', ExperimentAnalysis, 'experiment_analysis');
module.exports = ExperimentAnalysisModel
