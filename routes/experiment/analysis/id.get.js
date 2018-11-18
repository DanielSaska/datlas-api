'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../schema/mongo').mdb;
const ExperimentAnalysis = require("../../../schema/experiment_analysis")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);

	ExperimentAnalysis
		.findOne({_id: id})
		.exec(function(err, ea) {
			console.log(err);
			console.log(ea);
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (ea) {
				res.json(ea);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
