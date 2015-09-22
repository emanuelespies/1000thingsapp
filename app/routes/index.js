var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: '1000 Things app', message: 'Sign up or Log in' });
});

module.exports = router;