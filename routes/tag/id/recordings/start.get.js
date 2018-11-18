'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../../schema/mongo').mdb;
const Tag = require("../../../../schema/tag")
const Recording = require("../../../../schema/recording")

const route = function(req, res, next) {
	console.log(req.params);
	let id = mongoose.Types.ObjectId(req.params.id);
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	Tag
		.findOne({_id: id})
		.lean()
		.exec(async (err, tag) => {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (tag) {
				if (!tag.recordings) { tag.recordings = []; }
				let min = (start < tag.recordings.length) ? start : tag.recordings.length;
				let max = min+perPage;
				max = (max < tag.recordings.length) ? max : tag.recordings.length;
				console.log(min);
				console.log(max);
				let recordings = tag.recordings.slice(min,max);

				let next = null;
				if (tag.recordings.length > start+perPage) {
					next = start+perPage;
				}

				if (recordings.length > 0) {
					recordings = await Recording.find(
						{"_id": { "$in": recordings }},
						{
							"_id": 1, 
							"human_id": 1, 
							"commit": 1, 
							"summmary": 1,
							"experiment": 1,
							"data_types": 1,
							"tags": 1
						});
				}


				
				res.json({
					recordings: recordings,
					start: start,
					next: next,
					max_pg: Math.floor(tag.recordings.length/perPage),
					pg_size: perPage,
					n_entries: tag.recordings.length
				})
	
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
