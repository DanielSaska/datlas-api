'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Plugin = new Schema({
	exp_id: { type: Schema.ObjectId, required: true, index: true },
	data_type: { type: String, required: true, index: true },

	summary: { type: Object, required: false },
	addons: { type: [{
		title: { type: String, required: true },
		subtitle: { type: String, required: true },
		data: { type: Object, required: false },
		plot: { type: Object, required: false },
		priority: { type: Number, required: true },
		html: { type: String, required: true }
	}], required: true },

	//Errors
	err: {type: [String], required: false },
});
Plugin.index({ exp_id: 1, data_type: 1 });

var PluginModel = mdb.model('plugins', Plugin);
module.exports = PluginModel
