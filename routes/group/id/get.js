'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../schema/mongo').mdb;
const Group = require("../../../schema/group")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);

	Group
		.findOne({_id: id})
		.lean()
		.exec(function(err, grp) {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (grp) {
				grp.n_recordings = 0;
				if (grp.recordings) {
					grp.n_recordings = grp.recordings.length;
					delete grp.recordings;
				}
				res.json(grp);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
