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
    peaks : {type:String, required : true},
    motifCount : {type:Number, required : true},
    epitopeTag : {type:String,required: true},
    treatments : {type:String, required : true},
    growthMedia : {type:String, required : true},
    antibody : {type:String, required : true},    
    totalReads : {type:String, required : true},
    mappedReads : {type:String, required : true},
    mappedReadPercent: {type:String, required : true},
    uniquelyMappedReads:{type:String,required: true},
    uniquelyMappedPercent : {type:String, required : true},
    dedupUniquelyMappedReads : {type:String, required : true},   
    deduplicatedPercent : {type:String, required : true},
    project: {type:String, required : true},
    author: {type:String, required : true},
    codingImages: [{
        allFeaturesHeatmap: String,
        allFeaturesColorbar: String,
        boundFeaturesHeatmap: String,
        boundFeaturesColorbar:String,
        enrichedFeaturesHeatmap:String,
        enrichedFeaturesColorbar:String,
        nfrComposite:String,
        nfrHeatmap:String,
        nfrEnrichedHeatmap:String,
        nfrEnrichedComposite:String,
        tssComposite:String,
        tssHeatmap:String,
        tssEnrichedHeatmap:String,
        tssEnrichedComposite:String,
        tesComposite:String,
        tesHeatmap:String,
        tesEnrichedHeatmap:String,
        tesEnrichedComposite:String,
    }],
    nonCodingImages: [{
        cutHeatmap:String,
        sutHeatmap:String,
        xutHeatmap:String,
        cutEnrichedHeatmap:String,
        sutEnrichedHeatmap:String,
        xutEnrichedHeatmap:String,
        trnaHeatmap:String,
        arsHeatmap:String,
        xelementHeatmap:String,
        centromereHeatmap:String,
    }],
    motifImages: [{
        motif1Logo:String,
        motif1LogoReverse: String,
        motif1FourColor: String,
        motif1Composite: String,
        motif1Heatmap:String,
        motif2Logo:String,
        motif2LogoReverse: String,
        motif2FourColor: String,
        motif2Composite: String,
        motif2Heatmap:String,
        motif3Logo:String,
        motif3LogoReverse: String,
        motif3FourColor: String,
        motif3Composite: String,
        motif3Heatmap:String,
    }],
});

module.exports = mongoose.model('Sample',sampleSchema);