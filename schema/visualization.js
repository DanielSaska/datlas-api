'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Visualization = new Schema({
	exp_id: { type: Schema.ObjectId, required: true, index: true },
	data_type: { type: String, required: true, index: true },

	summary: { type: Object, required: false },

});
Visualization.index({ exp_id: 1, data_type: 1 });

const VisualizationModel = mdb.model('recording_data_visualization', Visualization, 'recording_data_visualization');
module.exports = VisualizationModel
