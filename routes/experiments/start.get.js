'use strict';
const mongoose = require('mongoose');
const mdb = require('../../schema/mongo').mdb;
const Experiment = require("../../schema/experiment");

const route = function(req, res, next) {
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	Experiment
		.aggregate([{$project: {_id: 1, name: 1, count: {"$size": "$recordings"}}}])
		.skip(start)
		.limit(perPage)
		.exec(function(err, experiments) {
			Experiment.countDocuments().exec(function(err, count) {
				if (err) return next(err);
				let next = null;
				if (count > start+perPage) {
					next = start+perPage;
				}
				res.json({
					experiments: experiments,
					start: start,
					next: next,
					max_pg: Math.floor(count/perPage),
					pg_size: perPage,
					n_entries: count
				})
			})
		});

};

module.exports = route;

