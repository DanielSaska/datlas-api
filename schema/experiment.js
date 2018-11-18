'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Experiment = new Schema({
	name: {type: String, required: true, index: { unique: true } },
	commit: { type: String, required: true },
	recordings: {type: [Schema.ObjectId], required: false},
	analysis: {type: [Schema.ObjectId], required: false},
});

const ExperimentModel = mdb.model('experiments', Experiment, 'experiments');
module.exports = ExperimentModel
