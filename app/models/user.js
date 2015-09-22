var mongoose = require('mongoose');
	
var UserSchema = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
	email: String,
	password: { type: String, required: true },
	created_at: { type: Date, default: Date.now }
	//	timelines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timeline' }]
});

mongoose.model('User', UserSchema);