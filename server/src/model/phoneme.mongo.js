const mongoose = require("mongoose");

const phonemeSchema = new mongoose.Schema({
	  name: {
		type: String,
		required: true
	  },
	  soundIn64: {
		type: String,
		required: true
	  },
});

// connection to phonemes collection
module.exports.phoneme = mongoose.model("Phoneme", phonemeSchema);