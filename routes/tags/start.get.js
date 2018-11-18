'use strict';
const mongoose = require('mongoose');
const mdb = require('../../schema/mongo').mdb;
const Tag = require("../../schema/tag");

const route = function(req, res, next) {
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	Tag
		.aggregate([{$project: {_id: 1, name: 1, count: {"$size": "$recordings"}}}])
		.skip(start)
		.limit(perPage)
		.exec(function(err, tags) {
			Tag.countDocuments().exec(function(err, count) {
				if (err) return next(err);
				let next = null;
				if (count > start+perPage) {
					next = start+perPage;
				}
				res.json({
					tags: tags,
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

