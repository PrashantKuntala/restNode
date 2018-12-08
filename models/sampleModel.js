const mongoose = require('mongoose');

// there are many validations that mongoose handles for you, might want to read the documentation.
// Is using ORMs like mongoose always necessary ?
const sampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sampleId : {type:Number, required : true},
    sampleName : {type:String, required : true},
    assayType : {type:String, required : true}
});

module.exports = mongoose.model('Sample',sampleSchema);