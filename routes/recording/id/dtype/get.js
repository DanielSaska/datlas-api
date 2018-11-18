'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../../schema/mongo').mdb;
const DataType = require("../../../../schema/dtype");

const route = function(req, res, next) {
	console.log(req.params);
	let id = mongoose.Types.ObjectId(req.params.id);
	let dtype = req.params.dtype;

	DataType
		.findOne({rec_id: id, data_type: dtype})
		.exec(function(err, rd) {
			console.log(rd);
			if (err) return next(err);
			if (rd) {
				res.json(rd);
			} else {
				res.status(404).json({});
			}
		})
};

module.exports = route;
