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
		port: process.env.PORT || 5000,
		mongo: {
			url: process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL
		},
	}
}
module.exports = function() {
	if ( process.env.NODE_ENV == 'production') {
		return config['production']
	} else {
		return config['local'];
	}
}

