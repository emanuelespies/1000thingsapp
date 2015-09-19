var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./app/config')();

var routes = require('./app/routes/index');

// Connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/1000things', function(err, db) {
	if(err) {
		console.log('Sorry, there is no mongo db server running.');
	} else {
		var attachDB = function(req, res, next) {
			req.db = db;
			next();
		};
		app.all('/admin*', attachDB, function(req, res, next) {
			Admin.run(req, res, next);
		});			
		app.all('/', attachDB, function(req, res, next) {
			Home.run(req, res, next);
		});		
		http.createServer(app).listen(config.port, function() {
		  	console.log(
		  		'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
		  		'\nExpress server listening on port ' + config.port
		  	);
		});
	}
});

var app = express();

/* SETS */
// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');

/* USES */
app.use(express.static('./public/assets/dist'));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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




app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
})
