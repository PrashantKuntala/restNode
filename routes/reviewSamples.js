const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// requiring the samples model
const Sample = require('../models/sampleModel');
const getURL = 'http://localhost:8080/samples/';
const imageURL = 'http://localhost:8080/images/';

// GET all samples
router.get('/', (req, res, next) =>{
    Sample.find()
    // .select('sampleId sampleName assayType') // returns only those field names from db
    .exec()
    .then(docs => {
        console.log(docs);
        const response = {
            count : docs.length,
            samples : docs.map(doc => {
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
                    mappedReads : doc.mappedReads,
                    totalReads : doc.totalReads,
                    dedupUniquelyMappedReads : doc.dedupUniquelyMappedReads,
                    mappedPercent: doc.mappedPercent,
                    uniquelyMappedPercent : doc.uniquelyMappedPercent,
                    codingImages: doc.codingImages,
                    nonCodingImages: doc.nonCodingImages,
                    motifImages: doc.motifImages,
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
   
    // append the hosturl to the image urls
    let codingImageUrl = req.body.codingImages.map(item => {
        return {
            url: imageURL+item.url,
            region: item.region,
            category: item.category
        }
    })

    let nonCodingImageUrl = req.body.nonCodingImages.map(item => {
        return {
            url: imageURL+item.url,
            region: item.region,
            category: item.category
        }
    })

    let motifImageUrl = req.body.motifImages.map(item => {
        return {
            url: imageURL+item.url,
            region: item.region,
            category: item.category
        }
    })
    

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
        mappedReads : req.body.mappedReads,
        totalReads : req.body.totalReads,
        dedupUniquelyMappedReads : req.body.dedupUniquelyMappedReads,
        dedupPercent: req.body.dedupPercent,
        mappedPercent: req.body.mappedPercent,
        uniquelyMappedPercent : req.body.uniquelyMappedPercent,
        codingImages: codingImageUrl,
        nonCodingImages: nonCodingImageUrl,
        motifImages: motifImageUrl,
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
                mappedReads : result.mappedReads,
                totalReads : result.totalReads,
                dedupUniquelyMappedReads : result.dedupUniquelyMappedReads,
                mappedPercent: result.mappedPercent,
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
    .then(doc => {
        console.log("from Database \n",doc);
        // if the document is not null then send the doc
        if (doc.length > 0){
            res.status(200).json({
                count : doc.length,
                sample: doc,
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