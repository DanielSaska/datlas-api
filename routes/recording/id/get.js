'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../schema/mongo').mdb;
const Recording = require("../../../schema/recording")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	let dtype = req.params.dtype;

	Recording
		.findOne({_id: id})
		.exec(function(err, rec) {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (rec) {
				res.json(rec);
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
