'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Recording = new Schema({
	//Basic details
	human_id: { type: String, required: true,  unique: true },
	commit: { type: String, required: true },
	data_types: {type: [String], required: false },

	summary: {type: Object, required: false },

	description: {type: String, required: false },
	experiment: {type: String, required: false },
	tags: {type: [String], required: false },

	//Errors
	err: {type: [String], required: false },
	warn: {type: [String], required: false }
});

var RecordingModel = mdb.model('recordings', Recording);
module.exports = RecordingModel

