'use strict';
const mongoose = require('mongoose');
const mdb = require('../../schema/mongo').mdb;
const Group = require("../../schema/group");

const route = function(req, res, next) {
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	Group
		.aggregate([{$project: {_id: 1, name: 1, description: 1, count: {"$size": "$recordings"}}}])
		.skip(start)
		.limit(perPage)
		.exec(function(err, groups) {
			Group.countDocuments().exec(function(err, count) {
				if (err) return next(err);
				let next = null;
				if (count > start+perPage) {
					next = start+perPage;
				}
				res.json({
					groups: groups,
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

