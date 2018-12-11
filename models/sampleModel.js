const mongoose = require('mongoose');


// there are many validations that mongoose handles for you, might want to read the documentation.
// Is using ORMs like mongoose always necessary ?
const sampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isPublic: {type:Boolean,default:false},
    isMergedReplicate: {type:Boolean,required:true},
    featureName: {type:String,required:true},
    standardGeneName: {type:String,required:true},
    commonName: {type:String,required:true},
    sgdId: {type:String,required:true},
    alias: {type:String,required:true},
    description: {type:String,required:true},
    featureType: {type:String,required:true},
    featureQualifier: {type:String,required:true},    
    sampleId : {type:Number, required : true},
    runId : {type:Number, required : true},
    genome : {type:String, required : true},
    assayType : {type:String, required : true},
    peaks : {type:Number, required : true},
    motifCount : {type:Number, required : true},
    epitopeTag : {type:String,required: true},
    treatments : {type:String, required : true},
    growthMedia : {type:String, required : true},
    antibody : {type:String, required : true},
    mappedReads : {type:String, required : true},
    totalReads : {type:String, required : true},
    dedupUniquelyMappedReads : {type:String, required : true},
    mappedPercent: {type:String, required : true},
    uniquelyMappedPercent : {type:String, required : true},
    dedupPercent : {type:String, required : true},
    codingImages: [{url: String, region: String, category: String}],
    nonCodingImages: [{url: String, region: String, category: String}],
    motifImages: [{url: String, region: String, category: String}],
});

module.exports = mongoose.model('Sample',sampleSchema);