'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../schema/mongo').mdb;
const Tag = require("../../../schema/tag")

const route = function(req, res, next) {
	//console.log(req.params);
	let id = mongoose.Types.ObjectId(req.params.id);

	Tag
		.findOne({_id: id})
		.lean()
		.exec(function(err, tag) {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (tag) {
				tag.n_recordings = 0;
				if (tag.recordings) {
					tag.n_recordings = tag.recordings.length;
					delete tag.recordings;
				}
				res.json(tag);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
