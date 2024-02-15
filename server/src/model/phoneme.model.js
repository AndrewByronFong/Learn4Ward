const { phoneme_model, phoneme_video_model } = require("./phoneme.mongo");
// phoneme
// name, soundIn64

async function createPhoneme(phoneme) {
  await phoneme_model.updateOne({ name: phoneme.name }, phoneme, {
    upsert: true,
  });
}

async function createVideoPhoneme(phoneme) {
  await phoneme_video_model.updateOne({ name: phoneme.name }, phoneme, {
    upsert: true,
  });
}

async function getPhoneme(name) {
  try {
    const info = await phoneme_model
      .find({ name: new RegExp("^" + name) })
      .lean();
    return info[0].soundIn64;
  } catch (err) {
    console.log(err);
  }
}

async function getVideoPhoneme(name) {
  try {
    const info = await phoneme_video_model
      .find({ name: new RegExp("^" + name) })
      .lean();
    return info[0].video;
  } catch (err) {
    console.log(err);
  }
}

async function removeAllPhonemes() {
  try {
    await phoneme_model.deleteMany({});
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPhoneme,
  createVideoPhoneme,
  getPhoneme,
  getVideoPhoneme,
  removeAllPhonemes,
};
