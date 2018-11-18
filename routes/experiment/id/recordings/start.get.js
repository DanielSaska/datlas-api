'use strict';
const mongoose = require('mongoose');
const mdb = require('../../../../schema/mongo').mdb;
const Experiment = require("../../../../schema/experiment")
const Recording = require("../../../../schema/recording")

const route = function(req, res, next) {
	console.log(req.params);
	let id = mongoose.Types.ObjectId(req.params.id);
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	Experiment
		.findOne({_id: id})
		.lean()
		.exec(async (err, exp) => {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (exp) {
				if (!exp.recordings) { exp.recordings = []; }
				let min = (start < exp.recordings.length) ? start : exp.recordings.length;
				let max = min+perPage;
				max = (max < exp.recordings.length) ? max : exp.recordings.length;
				console.log(min);
				console.log(max);
				let recordings = exp.recordings.slice(min,max);

				let next = null;
				if (exp.recordings.length > start+perPage) {
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
					max_pg: Math.floor(exp.recordings.length/perPage),
					pg_size: perPage,
					n_entries: exp.recordings.length
				})
	
			} else {
				res.status(404).json({});
			}
		})
};


module.exports = route;
