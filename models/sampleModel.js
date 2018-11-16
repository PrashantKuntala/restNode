const mongoose = require('mongoose');

const sampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sampleId : Number,
    sampleName : String,
    assayType : String
});

module.exports = mongoose.model('Sample',sampleSchema);