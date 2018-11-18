'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupAnalysis = new Schema({
	g_name: { type: String, required: true, index: true },
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

var GroupAnalysisModel = mdb.model('group_analysis', GroupAnalysis, 'group_analysis');
module.exports = GroupAnalysisModel
