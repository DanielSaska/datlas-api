'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../schema/mongo').mdb;
const GroupAnalysis = require("../../../schema/group_analysis")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);

	GroupAnalysis
		.findOne({_id: id})
		.exec(function(err, ga) {
			console.log(err);
			console.log(ga);
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (ga) {
				res.json(ga);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
