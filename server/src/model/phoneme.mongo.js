const mongoose = require("mongoose");

const phonemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  soundIn64: {
    type: String,
    required: true,
  },
});

const phonemeVideo = new mongoose.Schema({
  video: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const phoneme_model = mongoose.model("Phoneme", phonemeSchema);
const phoneme_video_model = mongoose.model("Phoneme_Video", phonemeVideo);

// connection to phonemes collection
module.exports = {
	phoneme_model,
	phoneme_video_model
}
