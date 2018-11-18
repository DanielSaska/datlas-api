'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
	name: {type: String, required: true, index: { unique: true } },
	description: { type: String, required: false },
	commit: { type: String, required: true },
	recordings: {type: [Schema.ObjectId], required: false},
	analysis: {type: [Schema.ObjectId], required: false},
});

var GroupModel = mdb.model('groups', Group);
module.exports = GroupModel
