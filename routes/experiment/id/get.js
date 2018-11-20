'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../schema/mongo').mdb;
const Experiment = require("../../../schema/experiment")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);

	Experiment
		.findOne({_id: id})
		.lean()
		.exec(function(err, exp) {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (exp) {
				exp.n_recordings = 0;
				if (exp.recordings) {
					exp.n_recordings = exp.recordings.length;
					delete exp.recordings;
				}
				res.json(exp);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
