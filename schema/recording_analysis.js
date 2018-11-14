'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordingAnalysis = new Schema({
	//Sequence details
	exp_id: { type: Schema.ObjectId, required: true, index: true },
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

var RecordingAnalysisModel = mdb.model('recording_analysis', RecordingAnalysis, 'recording_analysis');
module.exports = RecordingAnalysisModel
