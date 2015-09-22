var express = require('express');
var router = express.Router();

var user = require('../../app/controllers/user');

module.exports = function(app) {
	app.route('/user').post(user.create).get(user.list);
};