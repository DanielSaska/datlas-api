'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const DataType = new Schema({
	rec_id: { type: Schema.ObjectId, required: true, index: true },
	name: { type: String, required: true },
	short_name: { type: String, required: false },
	data_type: { type: String, required: true, index: true },

	summary: { type: Object, required: false },

	visualizations: { type: [Schema.ObjectId], required: false },

	//Errors
	err: {type: [String], required: false },
});
DataType.index({ exp_id: 1, data_type: 1 });

const DataTypeModel = mdb.model('recording_data', DataType, 'recording_data');
module.exports = DataTypeModel
