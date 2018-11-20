'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../../schema/mongo').mdb;
const Group = require("../../../../schema/group")
const Recording = require("../../../../schema/recording")

const route = function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	Group
		.findOne({_id: id})
		.lean()
		.exec(async (err, grp) => {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (grp) {
				if (!grp.recordings) { grp.recordings = []; }
				let min = (start < grp.recordings.length) ? start : grp.recordings.length;
				let max = min+perPage;
				max = (max < grp.recordings.length) ? max : grp.recordings.length;
				let recordings = grp.recordings.slice(min,max);

				let next = null;
				if (grp.recordings.length > start+perPage) {
					next = start+perPage;
				}

				if (recordings.length > 0) {
					recordings = await Recording.find(
						{"_id": { "$in": recordings }},
						{
							"_id": 1, 
							"human_id": 1, 
							"commit": 1, 
							"summary": 1,
							"experiment": 1,
							"data_types": 1,
							"tags": 1
						});
				}
				
				res.json({
					recordings: recordings,
					start: start,
					next: next,
					max_pg: Math.floor(grp.recordings.length/perPage),
					pg_size: perPage,
					n_entries: grp.recordings.length
				})
	
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
