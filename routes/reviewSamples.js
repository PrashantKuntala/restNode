const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load the configuration
const Config = require('../config.json');

// requiring the samples model
const Sample = require('../models/sampleModel');
const getURL = Config.privateEndpoint;
const imageURL = Config.imageURL;


// GET all samples
router.get('/', (req, res, next) =>{
    Sample.find()
    // .select('sampleId sampleName assayType') // returns only those field names from db
    .exec()
    .then(docs => {
        // console.log(docs);
        const response = {
            count : docs.length,
            samples : docs.map(doc => {
            
            // appending the server prefix to each image
            let codingImageUrl = doc.codingImages.map(item => {
                return {
                    allFeaturesHeatmap: imageURL+item.allFeaturesHeatmap,
                    allFeaturesColorbar: imageURL+item.allFeaturesColorbar,
                    boundFeaturesHeatmap: imageURL+item.boundFeaturesHeatmap,
                    boundFeaturesColorbar:imageURL+item.boundFeaturesColorbar,
                    enrichedFeaturesHeatmap:imageURL+item.enrichedFeaturesHeatmap,
                    enrichedFeaturesColorbar:imageURL+item.enrichedFeaturesColorbar,
                    nfrComposite:imageURL+item.nfrComposite,
                    nfrHeatmap:imageURL+item.nfrHeatmap,
                    nfrEnrichedHeatmap:imageURL+item.nfrEnrichedHeatmap,
                    nfrEnrichedComposite:imageURL+item.nfrEnrichedComposite,
                    tssComposite:imageURL+item.tssComposite,
                    tssHeatmap:imageURL+item.tssHeatmap,
                    tssEnrichedHeatmap:imageURL+item.tssEnrichedHeatmap,
                    tssEnrichedComposite:imageURL+item.tssEnrichedComposite,
                    tesComposite:imageURL+item.tesComposite,
                    tesHeatmap:imageURL+item.tesHeatmap,
                    tesEnrichedHeatmap:imageURL+item.tesEnrichedHeatmap,
                    tesEnrichedComposite:imageURL+item.tesEnrichedComposite,
                }
            })
            // appending the server prefix to each image
            let nonCodingImageUrl = doc.nonCodingImages.map(item => {
                return {
                    cutHeatmap:imageURL+item.cutHeatmap,
                    sutHeatmap:imageURL+item.sutHeatmap,
                    xutHeatmap:imageURL+item.xutHeatmap,
                    cutEnrichedHeatmap:imageURL+item.cutEnrichedHeatmap,
                    sutEnrichedHeatmap:imageURL+item.sutEnrichedHeatmap,
                    xutEnrichedHeatmap:imageURL+item.xutEnrichedHeatmap,
                    trnaHeatmap:imageURL+item.trnaHeatmap,
                    arsHeatmap:imageURL+item.arsHeatmap,
                    xelementHeatmap:imageURL+item.xelementHeatmap,
                    centromereHeatmap:imageURL+item.centromereHeatmap,
                }
            })
            // appending the server prefix to each image
            let motifImageUrl = doc.motifImages.map(item => {
                return {
                    motif1Logo:imageURL+item.motif1Logo,
                    motif1LogoReverse: imageURL+item.motif1LogoReverse,
                    motif1FourColor: imageURL+item.motif1FourColor,
                    motif1Composite: imageURL+item.motif1Composite,
                    motif1Heatmap:imageURL+item.motif1Heatmap,
                    motif2Logo:imageURL+item.motif2Logo,
                    motif2LogoReverse: imageURL+item.motif2LogoReverse,
                    motif2FourColor: imageURL+item.motif2FourColor,
                    motif2Composite: imageURL+item.motif2Composite,
                    motif2Heatmap:imageURL+item.motif2Heatmap,
                    motif3Logo:imageURL+item.motif3Logo,
                    motif3LogoReverse: imageURL+item.motif3LogoReverse,
                    motif3FourColor: imageURL+item.motif3FourColor,
                    motif3Composite: imageURL+item.motif3Composite,
                    motif3Heatmap:imageURL+item.motif3Heatmap,
                    
                }
            })
                    

                return {
                    _id : doc._id,
                    isPublic:doc.isPublic, 
                    featureName: doc.featureName,
                    standardGeneName: doc.standardGeneName,
                    commonName: doc.commonName,
                    sgdId: doc.sgdId,
                    alias: doc.alias,
                    description: doc.description,
                    featureType: doc.featureType,
                    featureQualifier: doc.featureQualifier,
                    isMergedReplicate: doc.isMergedReplicate,
                    sampleId : doc.sampleId,
                    runId : doc.runId,
                    genome : doc.genome,
                    assayType : doc.assayType,
                    peaks : doc.peaks,
                    motifCount : doc.motifCount,
                    epitopeTag : doc.epitopeTag,
                    treatments : doc.treatments,
                    growthMedia : doc.growthMedia,
                    antibody : doc.antibody,
                    totalReads : doc.totalReads,
                    mappedReads : doc.mappedReads,
                    mappedReadPercent: doc.mappedReadPercent,
                    uniquelyMappedReads:doc.uniquelyMappedReads,
                    uniquelyMappedPercent : doc.uniquelyMappedPercent,
                    dedupUniquelyMappedReads : doc.dedupUniquelyMappedReads,
                    deduplicatedPercent : doc.deduplicatedPercent,         
                    codingImages: codingImageUrl,
                    nonCodingImages: nonCodingImageUrl,
                    motifImages: motifImageUrl,
                    request:{
                        type : 'GET',
                        url:  getURL + doc._id
                    }
                    // doc: doc
                }
            })            
        }
        res.status(200).json(response);        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });        
    });

    // if you have two responses then the second response is sent by express.

    // res.status(200).json({
    //     message : 'Handling GET requests to /samples'
    // });
});

// Post all samples ( this is handling one sample now), 
// maybe you need to use map if there is more than one sample
// remember the user doesn't send the id
router.post('/', (req, res, next) =>{
   
    // creating a new object for sample
    const sample = new Sample({
        _id: new mongoose.Types.ObjectId(),
        featureName: req.body.featureName,
        standardGeneName: req.body.standardGeneName,
        commonName: req.body.commonName,
        sgdId: req.body.sgdId,
        alias: req.body.alias,
        description: req.body.description,
        featureType: req.body.featureType,
        featureQualifier: req.body.featureQualifier,
        isMergedReplicate: req.body.isMergedReplicate,
        sampleId : req.body.sampleId,
        runId : req.body.runId,
        genome : req.body.genome,
        assayType : req.body.assayType,
        peaks : req.body.peaks,
        motifCount : req.body.motifCount,
        epitopeTag : req.body.epitopeTag,
        treatments : req.body.treatments,
        growthMedia : req.body.growthMedia,
        antibody : req.body.antibody,
        totalReads : req.body.totalReads,
        mappedReads : req.body.mappedReads,
        mappedReadPercent: req.body.mappedReadPercent,
        uniquelyMappedReads:req.body.uniquelyMappedReads,
        uniquelyMappedPercent : req.body.uniquelyMappedPercent,
        dedupUniquelyMappedReads : req.body.dedupUniquelyMappedReads,
        deduplicatedPercent : req.body.deduplicatedPercent,
        uniquelyMappedPercent : req.body.uniquelyMappedPercent,
        codingImages: req.body.codingImages,
        nonCodingImages: req.body.nonCodingImages,
        motifImages: req.body.motifImages,
    });
    // saving the item into the database using promises
    sample.save().then( result => {
        // console.log(result); 
        res.status(201).json({
            message : 'Created the sample',
            sample : {
                _id : result._id,
                isPublic:result.isPublic,
                featureName: result.featureName,
                standardGeneName: result.standardGeneName,
                commonName: result.commonName,
                sgdId: result.sgdId,
                alias: result.alias,
                description: result.description,
                featureType: result.featureType,
                featureQualifier: result.featureQualifier,
                isMergedReplicate: result.isMergedReplicate,
                sampleId : result.sampleId,
                runId : result.runId,
                genome : result.genome,
                assayType : result.assayType,
                peaks : result.peaks,
                motifCount : result.motifCount,
                epitopeTag : result.epitopeTag,
                treatments : result.treatments,
                growthMedia : result.growthMedia,
                antibody : result.antibody,
                totalReads : result.totalReads,
                mappedReads : result.mappedReads,
                mappedReadPercent: result.mappedReadPercent,
                uniquelyMappedReads:result.uniquelyMappedReads,
                uniquelyMappedPercent : result.uniquelyMappedPercent,
                dedupUniquelyMappedReads : result.dedupUniquelyMappedReads,
                deduplicatedPercent : result.deduplicatedPercent,
                uniquelyMappedPercent : result.uniquelyMappedPercent,                
                codingImages: result.codingImages,
                nonCodingImages: result.nonCodingImages,
                motifImages: result.motifImages,
                request:{
                    type : 'GET',
                    url:  getURL + result._id
                }
            } 
        });       
    }).catch(err => {console.log(err),
        res.status(500).json({error : err});
    });    
});

// // HTTP verbs for individual samples
// router.get('/:sampleId', (req, res, next) =>{
//     const id =  req.params.sampleId;
//     Sample.findById(id)
//     // .select('sampleId standardGeneName assayType')
//     .exec()
//     .then(doc => {
//         console.log("from Database \n",doc);
//         // if the document is not null then send the doc
//         if (doc){
//             res.status(200).json({
//                 sample: doc,
//                 request : {
//                     type : 'GET',
//                     description: 'Get all the products',
//                     url:  getURL 
//                 }
//             });
//         }
//         // send the 404 message
//         else{
//             res.status(404).json({
//                 message : "Not Found a Valid Entry"
//             });
//         }                
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//     });
// });

// HTTP verbs for individual proteins
//  Need to implement commonname and alias based searches too, could be done on the front end.
//  to hash out the corresponding standardGeneName for the alias before making the request.
router.get('/:proteinName', (req, res, next) =>{
    const proteinName =  req.params.proteinName.toUpperCase();
    Sample.find({'standardGeneName':proteinName})
    // .select('sampleId standardGeneName assayType')
    .exec()
    .then(docs => {
        console.log("from Database \n",docs);
        // if the document is not null then send the doc
        if (docs.length > 0){
            res.status(200).json({
                count : docs.length,
                samples : docs.map(doc => {
            
                    // appending the server prefix to each image
                    let codingImageUrl = doc.codingImages.map(item => {
                        return {
                            allFeaturesHeatmap: imageURL+item.allFeaturesHeatmap,
                            allFeaturesColorbar: imageURL+item.allFeaturesColorbar,
                            boundFeaturesHeatmap: imageURL+item.boundFeaturesHeatmap,
                            boundFeaturesColorbar:imageURL+item.boundFeaturesColorbar,
                            enrichedFeaturesHeatmap:imageURL+item.enrichedFeaturesHeatmap,
                            enrichedFeaturesColorbar:imageURL+item.enrichedFeaturesColorbar,
                            nfrComposite:imageURL+item.nfrComposite,
                            nfrHeatmap:imageURL+item.nfrHeatmap,
                            nfrEnrichedHeatmap:imageURL+item.nfrEnrichedHeatmap,
                            nfrEnrichedComposite:imageURL+item.nfrEnrichedComposite,
                            tssComposite:imageURL+item.tssComposite,
                            tssHeatmap:imageURL+item.tssHeatmap,
                            tssEnrichedHeatmap:imageURL+item.tssEnrichedHeatmap,
                            tssEnrichedComposite:imageURL+item.tssEnrichedComposite,
                            tesComposite:imageURL+item.tesComposite,
                            tesHeatmap:imageURL+item.tesHeatmap,
                            tesEnrichedHeatmap:imageURL+item.tesEnrichedHeatmap,
                            tesEnrichedComposite:imageURL+item.tesEnrichedComposite,
                        }
                    })
                    // appending the server prefix to each image
                    let nonCodingImageUrl = doc.nonCodingImages.map(item => {
                        return {
                            cutHeatmap:imageURL+item.cutHeatmap,
                            sutHeatmap:imageURL+item.sutHeatmap,
                            xutHeatmap:imageURL+item.xutHeatmap,
                            cutEnrichedHeatmap:imageURL+item.cutEnrichedHeatmap,
                            sutEnrichedHeatmap:imageURL+item.sutEnrichedHeatmap,
                            xutEnrichedHeatmap:imageURL+item.xutEnrichedHeatmap,
                            trnaHeatmap:imageURL+item.trnaHeatmap,
                            arsHeatmap:imageURL+item.arsHeatmap,
                            xelementHeatmap:imageURL+item.xelementHeatmap,
                            centromereHeatmap:imageURL+item.centromereHeatmap,
                        }
                    })
                    // appending the server prefix to each image
                    let motifImageUrl = doc.motifImages.map(item => {
                        return {
                            motif1Logo:imageURL+item.motif1Logo,
                            motif1LogoReverse: imageURL+item.motif1LogoReverse,
                            motif1FourColor: imageURL+item.motif1FourColor,
                            motif1Composite: imageURL+item.motif1Composite,
                            motif1Heatmap:imageURL+item.motif1Heatmap,
                            motif2Logo:imageURL+item.motif2Logo,
                            motif2LogoReverse: imageURL+item.motif2LogoReverse,
                            motif2FourColor: imageURL+item.motif2FourColor,
                            motif2Composite: imageURL+item.motif2Composite,
                            motif2Heatmap:imageURL+item.motif2Heatmap,
                            motif3Logo:imageURL+item.motif3Logo,
                            motif3LogoReverse: imageURL+item.motif3LogoReverse,
                            motif3FourColor: imageURL+item.motif3FourColor,
                            motif3Composite: imageURL+item.motif3Composite,
                            motif3Heatmap:imageURL+item.motif3Heatmap,
                            
                        }
                    })
                            
        
                        return {
                            _id : doc._id,
                            isPublic:doc.isPublic, 
                            featureName: doc.featureName,
                            standardGeneName: doc.standardGeneName,
                            commonName: doc.commonName,
                            sgdId: doc.sgdId,
                            alias: doc.alias,
                            description: doc.description,
                            featureType: doc.featureType,
                            featureQualifier: doc.featureQualifier,
                            isMergedReplicate: doc.isMergedReplicate,
                            sampleId : doc.sampleId,
                            runId : doc.runId,
                            genome : doc.genome,
                            assayType : doc.assayType,
                            peaks : doc.peaks,
                            motifCount : doc.motifCount,
                            epitopeTag : doc.epitopeTag,
                            treatments : doc.treatments,
                            growthMedia : doc.growthMedia,
                            antibody : doc.antibody,                            
                            totalReads : doc.totalReads,                            
                            mappedReads : doc.mappedReads,
                            mappedReadPercent: doc.mappedReadPercent,
                            uniquelyMappedReads:doc.uniquelyMappedReads,
                            uniquelyMappedPercent : doc.uniquelyMappedPercent,
                            dedupUniquelyMappedReads : doc.dedupUniquelyMappedReads,
                            deduplicatedPercent : doc.deduplicatedPercent, 
                            codingImages: codingImageUrl,
                            nonCodingImages: nonCodingImageUrl,
                            motifImages: motifImageUrl,
                            request:{
                                type : 'GET',
                                url:  getURL + doc._id
                            }
                            // doc: doc
                        }
                    }) ,
                request : {
                    type : 'GET',
                    description: 'Get all the products',
                    url:  getURL 
                }
            });
        }
        // send the 404 message
        else{
            res.status(404).json({
                message : "Not Found a Valid Entry",
                page : "You display a search page or not found page"
            });
        }                
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/:sampleId', (req, res, next) =>{
    res.status(201).json({
        message : 'Handling POST requests to /samples/:sampleId',
        Info : 'Posted Sample, under construction'
    });
});


// Edit the Samples using mongoose id
router.get('/edit/:sampleId', (req, res, next) =>{
    const sampleId =  req.params.sampleId.toUpperCase();
    Sample.find({'_id':sampleId})
    // .select('sampleId standardGeneName assayType')
    .exec()
    .then(docs => {
        console.log("from Database \n",docs);
        // if the document is not null then send the doc
        if (docs.length > 0){
            res.status(200).json({
                count : docs.length,
                samples : docs.map(doc => {
            
                    // appending the server prefix to each image
                    let codingImageUrl = doc.codingImages.map(item => {
                        return {
                            allFeaturesHeatmap: imageURL+item.allFeaturesHeatmap,
                            allFeaturesColorbar: imageURL+item.allFeaturesColorbar,
                            boundFeaturesHeatmap: imageURL+item.boundFeaturesHeatmap,
                            boundFeaturesColorbar:imageURL+item.boundFeaturesColorbar,
                            enrichedFeaturesHeatmap:imageURL+item.enrichedFeaturesHeatmap,
                            enrichedFeaturesColorbar:imageURL+item.enrichedFeaturesColorbar,
                            nfrComposite:imageURL+item.nfrComposite,
                            nfrHeatmap:imageURL+item.nfrHeatmap,
                            nfrEnrichedHeatmap:imageURL+item.nfrEnrichedHeatmap,
                            nfrEnrichedComposite:imageURL+item.nfrEnrichedComposite,
                            tssComposite:imageURL+item.tssComposite,
                            tssHeatmap:imageURL+item.tssHeatmap,
                            tssEnrichedHeatmap:imageURL+item.tssEnrichedHeatmap,
                            tssEnrichedComposite:imageURL+item.tssEnrichedComposite,
                            tesComposite:imageURL+item.tesComposite,
                            tesHeatmap:imageURL+item.tesHeatmap,
                            tesEnrichedHeatmap:imageURL+item.tesEnrichedHeatmap,
                            tesEnrichedComposite:imageURL+item.tesEnrichedComposite,
                        }
                    })
                    // appending the server prefix to each image
                    let nonCodingImageUrl = doc.nonCodingImages.map(item => {
                        return {
                            cutHeatmap:imageURL+item.cutHeatmap,
                            sutHeatmap:imageURL+item.sutHeatmap,
                            xutHeatmap:imageURL+item.xutHeatmap,
                            cutEnrichedHeatmap:imageURL+item.cutEnrichedHeatmap,
                            sutEnrichedHeatmap:imageURL+item.sutEnrichedHeatmap,
                            xutEnrichedHeatmap:imageURL+item.xutEnrichedHeatmap,
                            trnaHeatmap:imageURL+item.trnaHeatmap,
                            arsHeatmap:imageURL+item.arsHeatmap,
                            xelementHeatmap:imageURL+item.xelementHeatmap,
                            centromereHeatmap:imageURL+item.centromereHeatmap,
                        }
                    })
                    // appending the server prefix to each image
                    let motifImageUrl = doc.motifImages.map(item => {
                        return {
                            motif1Logo:imageURL+item.motif1Logo,
                            motif1LogoReverse: imageURL+item.motif1LogoReverse,
                            motif1FourColor: imageURL+item.motif1FourColor,
                            motif1Composite: imageURL+item.motif1Composite,
                            motif1Heatmap:imageURL+item.motif1Heatmap,
                            motif2Logo:imageURL+item.motif2Logo,
                            motif2LogoReverse: imageURL+item.motif2LogoReverse,
                            motif2FourColor: imageURL+item.motif2FourColor,
                            motif2Composite: imageURL+item.motif2Composite,
                            motif2Heatmap:imageURL+item.motif2Heatmap,
                            motif3Logo:imageURL+item.motif3Logo,
                            motif3LogoReverse: imageURL+item.motif3LogoReverse,
                            motif3FourColor: imageURL+item.motif3FourColor,
                            motif3Composite: imageURL+item.motif3Composite,
                            motif3Heatmap:imageURL+item.motif3Heatmap,
                            
                        }
                    })
                            
        
                        return {
                            _id : doc._id,
                            isPublic:doc.isPublic, 
                            featureName: doc.featureName,
                            standardGeneName: doc.standardGeneName,
                            commonName: doc.commonName,
                            sgdId: doc.sgdId,
                            alias: doc.alias,
                            description: doc.description,
                            featureType: doc.featureType,
                            featureQualifier: doc.featureQualifier,
                            isMergedReplicate: doc.isMergedReplicate,
                            sampleId : doc.sampleId,
                            runId : doc.runId,
                            genome : doc.genome,
                            assayType : doc.assayType,
                            peaks : doc.peaks,
                            motifCount : doc.motifCount,
                            epitopeTag : doc.epitopeTag,
                            treatments : doc.treatments,
                            growthMedia : doc.growthMedia,
                            antibody : doc.antibody,                            
                            totalReads : doc.totalReads,                            
                            mappedReads : doc.mappedReads,
                            mappedReadPercent: doc.mappedReadPercent,
                            uniquelyMappedReads:doc.uniquelyMappedReads,
                            uniquelyMappedPercent : doc.uniquelyMappedPercent,
                            dedupUniquelyMappedReads : doc.dedupUniquelyMappedReads,
                            deduplicatedPercent : doc.deduplicatedPercent, 
                            codingImages: codingImageUrl,
                            nonCodingImages: nonCodingImageUrl,
                            motifImages: motifImageUrl,
                            request:{
                                type : 'GET',
                                url:  getURL + doc._id
                            }
                            // doc: doc
                        }
                    }) ,
                request : {
                    type : 'GET',
                    description: 'Get all the products',
                    url:  getURL 
                }
            });
        }
        // send the 404 message
        else{
            res.status(404).json({
                message : "Not Found a Valid Entry",
                page : "You display a search page or not found page"
            });
        }                
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/:sampleId', (req, res, next) =>{
    res.status(201).json({
        message : 'Handling POST requests to /samples/:sampleId',
        Info : 'Posted Sample, under construction'
    });
});

// the request body for the path needs to be in this form, an Array

// [
// 	{
// 	 "propName" : "sampleName","value" : "REB1"
// 	}
// ]

router.patch('/:sampleId', (req, res, next) =>{
    const id = req.params.sampleId;
    const updateOps = {};
    // change only the key value pairs that need to be changed
    for (let ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    // console.log(updateOps);
    
    // updating the data
    Sample.update({_id : id}, { $set : updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Sample Updated',
            sample : result,
            request :{
                type: 'GET',
                url : getURL
            }            
        });      
    }).catch(err => {
        error : err
    });
});

router.delete('/:sampleId', (req, res, next) =>{
    const id = req.params.sampleId;
    Sample.remove({_id : id})
    .exec()
    .then(result=>{
        console.log(result);        
        res.status(200).json({
            message : 'Sample Deleted',
            request: {
                type:'POST',
                url : getURL,
                body: {sampleId : 'Number', sampleName: 'String',assayType:'String'}
            }
        });
    }).catch(err => {
        console.log(err);        
        res.status(500).json({
            error : err
        })
    });
});

// export the router
module.exports = router;