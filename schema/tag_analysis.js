'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagAnalysis = new Schema({
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

var TagAnalysisModel = mdb.model('tag_analysis', TagAnalysis, 'tag_analysis');
module.exports = TagAnalysisModel
