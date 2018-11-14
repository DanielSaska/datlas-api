'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../schema/mongo').mdb;
const RecordingAnalysis = require("../../../schema/recording_analysis")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);

	RecordingAnalysis
		.findOne({_id: id})
		.exec(function(err, ra) {
			console.log(err);
			console.log(ra);
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (ra) {
				res.json(ra);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
