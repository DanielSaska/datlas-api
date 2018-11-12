'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Recording = new Schema({
	//Basic details
	human_id: { type: String, required: true,  unique: true },
	commit: { type: String, required: true },
	datetime: { type: Date, required: false },
	duration: { type: Number, required: false },
	data_types: {type: [String], required: false },

	description: {type: String, required: false },
	experiment: {type: String, required: false },
	tags: {type: [String], required: false },
	//Sample details
	sample: { type: {
		id: { type: Number, required: false }, 
		dpf: { type: Number, required: false }, 
		expression: { type: [String], required: false },
		description: { type: String, required: false }
	}, required: true },
	//Errors
	err: {type: [String], required: false },
	warn: {type: [String], required: false }
});

var RecordingModel = mdb.model('recordings', Recording);
module.exports = RecordingModel

