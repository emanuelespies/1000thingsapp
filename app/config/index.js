var config = {
	local: {
		mode: 'local',
		port: 5000,
		mongo: {
			url: "mongodb://127.0.0.1:27017/1000things"
		}
	},
	production: {
		mode: 'production',
		port: 5000,
		mongo: {
			url: "mongodb://espies:heroku_gqt2nnf1@ds051553.mongolab.com:51553/heroku_gqt2nnf1"
		},
	}
}
module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
}