'use strict';

const mdb = require('./mongo').mdb;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema({
	name: {type: String, required: true, index: { unique: true } },
	commit: { type: String, required: true },
	recordings: {type: [Schema.ObjectId], required: false},
	analysis: {type: [Schema.ObjectId], required: false},
});

const TagModel = mdb.model('tags', Tag);
module.exports = TagModel
