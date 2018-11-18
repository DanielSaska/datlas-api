'use strict';
const mongoose = require('mongoose');
const mdb = require('../../schema/mongo').mdb;
const Recording = require("../../schema/recording");

const route = function(req, res, next) {
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	Recording
		.find({})
		.skip(start)
		.limit(perPage)
		.exec(function(err, recordings) {
			Recording.countDocuments().exec(function(err, count) {
				if (err) return next(err);
				let next = null;
				if (count > start+perPage) {
					next = start+perPage;
				}
				res.json({
					recordings: recordings,
					start: start,
					next: next,
					max_pg: Math.floor(count/perPage),
					pg_size: perPage,
					n_entries: count
				})
			})
		})
};

module.exports = route;

