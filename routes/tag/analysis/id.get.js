'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../schema/mongo').mdb;
const TagAnalysis = require("../../../schema/tag_analysis")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);

	TagAnalysis
		.findOne({_id: id})
		.exec(function(err, ta) {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (ta) {
				res.json(ta);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
