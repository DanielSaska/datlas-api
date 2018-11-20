'use strict';
const mongoose = require('mongoose');
const mdb = require('../../schema/mongo').mdb;
const Visualization = require("../../schema/visualization")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);

	Visualization
		.findOne({_id: id})
		.exec(function(err, vis) {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (vis) {
				res.json(vis);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
