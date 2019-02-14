const mongoose = require('mongoose');

// there are many validations that mongoose handles for you, might want to read the documentation.
// Is using ORMs like mongoose always necessary ?
const sgdSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    featureName: {type:String,required:true},
    standardGeneName: {type:String,required:true},
    commonName: {type:String,required:true},
    sgdId: {type:String,required:true},
    alias: {type:String,required:true},
    description: {type:String,required:true},
    featureType: {type:String,required:true},
    featureQualifier: {type:String,required:true}, 
});

module.exports = mongoose.model('SGDInfo',sgdSchema);