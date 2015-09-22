var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./app/config')();

// Connect to MongoDB
var mongoose 	= require('mongoose'); 
mongoose.connect(config.mongo.url, function(err, db) {
	if(err) {
		console.log('Sorry, there is no mongo db server running. ' + config.mode + " " + config.mongo.url);
	} else {
		console.log ('Succeeded connected to: ' +config.mode + " " + config.mongo.url);
			
		http.createServer(app).listen(config.port, function() {
		  	console.log(
		  		'Successfully connected to ' + config.mongo.url,
		  		'\nExpress server listening on port ' + config.port
		  	);
		});
	}
});
// models
require('./app/models/user');

// routes
var app = express();
var routes = require('./app/routes/index');

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var user = require('./app/routes/user')(app);

/* USES */
app.use(express.static('./public/assets/dist'));
app.use('/', routes);


/* SETS */
// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');




// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'local') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
