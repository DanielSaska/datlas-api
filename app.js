'use strict';
const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cfg = require("./config.json");
const mdb = require('./schema/mongo').mdb;
const version = require('./package.json').version;


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
			console.error('Failed to connect to MongoDB');
			console.error(err);
			setTimeout(mdb_start, 1000);
		}
	});
};
mdb_start();

/////////////////////////////////////////////////////////////
// Express
const app = express()
app.use(helmet())
app.use(function (req, res, next) { //TODO: may want to revisit this/load from conifg
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
// Version
app.get('/api/v1/version', (req, res) => {
		res.status(200).send(version);
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


