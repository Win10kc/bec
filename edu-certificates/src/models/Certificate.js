const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentAddress: { type: String, required: true },
  certificateURI: { type: String, required: true },
  tokenId: { type: Number, required: true }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
