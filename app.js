'use strict';
const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cfg = require("./config.json");
const mdb = require('./schema/mongo').mdb;


/////////////////////////////////////////////////////////////
// Mongo
let ready = false;
const mongo_options = {
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	bufferMaxEntries: 0,
};

mdb.connection.on('connected', function(){
	console.log('Connected to Data Atlas MongoDB');
	ready = true;
});
const mdb_start = function() {
	return mdb.connect(cfg.mongo, mongo_options).catch(function(err) {
		if (err) {
			//TODO: contact Oracle
			console.log('Failed to connect to MongoDB');
			console.log(err);
			setTimeout(mdb_start, 1000);
		}
	});
};
mdb_start();

/////////////////////////////////////////////////////////////
// Express
const app = express()
app.use(helmet())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', require("./routes"));

/*
const Plugin = require("./schema/plugin");
const Analysis = require("./schema/analysis");

//Analysis
app.get('/api/v1/recording/:id/analysis/addons', function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	console.log(id)

	Analysis
		.findOne({_id: id}, {addons: true})
		.exec(function(err, bd) {
			console.log(err);
			if (err) {
				//console.error(err);
				return next(err);
			}
			console.log(bd);
			if (bd) {
				res.json(bd);
			} else {
				res.status(404).json({});
			}
		})
});


//Returns the whole plugin entry
app.get('/api/v1/recording/:id/:dtype', function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	let dtype = req.params.dtype;

	Plugin
		.findOne({exp_id: id, data_type: dtype})
		.exec(function(err, bd) {
			if (err) return next(err);
			//console.log(bd);
			if (bd) {
				res.json(bd);
			} else {
				res.status(404).json({});
			}
		})
});

//Returns the plugin summary only
app.get('/api/v1/recording/:id/:dtype/summary', function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	let dtype = req.params.dtype;

	Plugin
		.findOne({exp_id: id, data_type: dtype}, {summary: true})
		.exec(function(err, bd) {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (bd) {
				res.json(bd);
			} else {
				res.status(404).json({});
			}
		})
});



//Returns the plugin addons only
app.get('/api/v1/recording/:id/:dtype/addons', function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	let dtype = req.params.dtype;

	Plugin
		.findOne({exp_id: id, data_type: dtype}, {addons: true})
		.exec(function(err, bd) {
			if (err) {
				//console.error(err);
				return next(err);
			}
			if (bd) {
				res.json(bd);
			} else {
				res.status(404).json({});
			}
		})
});


const ExperimentDetails = require("./schema/experiment_details")
app.get('/api/v1/experiments/:start', function(req, res, next) {
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	ExperimentDetails
		.aggregate([{$project: {_id: 1, name: 1, count: {"$size": "$recordings"}}}])
		.skip(start)
		.limit(perPage)
		.exec(function(err, experiments) {
			ExperimentDetails.countDocuments().exec(function(err, count) {
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
					max: count
				})
			})
		})
});

app.get('/api/v1/experiment/:id/details', function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	console.log(id);

	ExperimentDetails
		.aggregate([
			{ "$match": {'_id':id}},
			{ "$unwind": "$recordings" },
			{
				"$lookup":
				{
					from: "recordings",
					localField: "recordings",
					foreignField: "_id",
					as: "recordings"
				}
			},
			{ "$unwind": "$recordings" },
			{ "$project": { "_id": 1, "name": 1, "recordings": {"_id": 1, "datetime": 1, "duration": 1, "tags": 1, "human_id": 1}, "analysis": 1 }},
			{ "$group": {
				"_id": "$_id",
				"name": { "$first": "$name"},
				"analysis": { "$first": "$analysis"},
				"recordings": { "$push": "$recordings" },
			}}
		])
		.exec(function(err, bd) {
			if (err) {
				console.log(err);
				return next(err);
			}
			//console.log(bd);
			if (bd.length > 0) {
				res.json(bd[0]);
			} else {
				res.status(404).json({});
			}
		})
});


const TagDetails = require("./schema/tag_details")
app.get('/api/v1/tags/:start', function(req, res, next) {
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	TagDetails
		.aggregate([{$project: {_id: 1, name: 1, count: {"$size": "$recordings"}}}])
		.skip(start)
		.limit(perPage)
		.exec(function(err, tags) {
			TagDetails.countDocuments().exec(function(err, count) {
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
					max: count
				})
			})
		})
});

app.get('/api/v1/tag/:id/details', function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	console.log(id);

	TagDetails
		.aggregate([
			{ "$match": {'_id':id}},
			{ "$unwind": "$recordings" },
			{
				"$lookup":
				{
					from: "recordings",
					localField: "recordings",
					foreignField: "_id",
					as: "recordings"
				}
			},
			{ "$unwind": "$recordings" },
			{ "$project": { "_id": 1, "name": 1, "recordings": {"_id": 1, "datetime": 1, "duration": 1, "tags": 1, "human_id": 1}, "analysis": 1 }},
			{ "$group": {
				"_id": "$_id",
				"name": { "$first": "$name"},
				"analysis": { "$first": "$analysis"},
				"recordings": { "$push": "$recordings" },
			}}
		])
		.exec(function(err, bd) {
			if (err) {
				console.log(err);
				return next(err);
			}
			//console.log(bd);
			if (bd.length > 0) {
				res.json(bd[0]);
			} else {
				res.status(404).json({});
			}
		})
});


const GroupDetails = require("./schema/group_details")
app.get('/api/v1/groups/:start', function(req, res, next) {
	let perPage = 20;
	let start = parseInt(req.params.start,0);

	GroupDetails
		.aggregate([{$project: {_id: 1, name: 1, description: 1, count: {"$size": "$recordings"}}}])
		.skip(start)
		.limit(perPage)
		.exec(function(err, groups) {
			GroupDetails.countDocuments().exec(function(err, count) {
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
					max: count
				})
			})
		})
});

app.get('/api/v1/group/:id/details', function(req, res, next) {
	let id = mongoose.Types.ObjectId(req.params.id);
	console.log(id);

	GroupDetails
		.aggregate([
			{ "$match": {'_id':id}},
			{ "$unwind": "$recordings" },
			{
				"$lookup":
				{
					from: "recordings",
					localField: "recordings",
					foreignField: "_id",
					as: "recordings"
				}
			},
			{ "$unwind": "$recordings" },
			{ "$project": { "_id": 1, "name": 1, "description": 1, "recordings": {"_id": 1, "datetime": 1, "duration": 1, "tags": 1, "human_id": 1}, "analysis": 1 }},
			{ "$group": {
				"_id": "$_id",
				"name": { "$first": "$name"},
				"description": { "$first": "$description"},
				"analysis": { "$first": "$analysis"},
				"recordings": { "$push": "$recordings" },
			}}
		])
		.exec(function(err, bd) {
			if (err) {
				console.log(err);
				return next(err);
			}
			//console.log(bd);
			if (bd.length > 0) {
				res.json(bd[0]);
			} else {
				res.status(404).json({});
			}
		})
});

*/



/////////////////////////////////////////////////////////////
// Health
app.get('/api/v1/healthz', (req, res) => {
	if (ready && mdb.connection.readyState == 1) {
		res.status(200).send('OK');
	} else if (!ready) {
		res.status(500).send('INIT');
	} else {
		res.status(500).send('ERR');
	}
});

/////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	console.error(err);
	res.status(err.status || 500);
	res.json({error: { message: "" }})
});


const server = app.listen(cfg.port, '0.0.0.0', () => {
	console.log(`Listening on port ${cfg.port}`)
});

module.exports = server;


