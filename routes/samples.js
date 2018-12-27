//  This route only offers GET all published samples for YEP 
//  and
//  GET samples based on a protein name

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// requiring the samples model
const Sample = require('../models/sampleModel');
const getURL = 'http://localhost:8080/samples/';


// GET all samples
router.get('/', (req, res, next) =>{
    Sample.find({"isPublic" :  true})
    // .select('sampleId sampleName assayType') // returns only those field names from db
    .exec()
    .then(docs => {
        console.log(docs);
        const response = {
            count : docs.length,
            samples : docs.map(doc => {
                return {
                    _id : doc._id,
                    // isPublic:doc.isPublic, // send only the public datasets 
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

// HTTP verbs for individual proteins
//  Need to implement commonname and alias based searches too, could be done on the front end.
//  to hash out the corresponding standardGeneName for the alias before making the request.
router.get('/:proteinName', (req, res, next) =>{
    const proteinName =  req.params.proteinName.toUpperCase();
    Sample.find({'standardGeneName':proteinName, "isPublic" :  true })
    // .select('sampleId standardGeneName assayType')
    .exec()
    .then(docs => {
        console.log("from Database \n",docs);
        const response = {
            count : docs.length,
            samples : docs.map(doc => {
                return {
                    _id : doc._id,
                    // isPublic:doc.isPublic, // send only the public datasets 
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
                    treatment : doc.treatment,
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
        // if the document is not null then send the doc
        if (docs.length > 0){
            res.status(200).json(response); 
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

// export the router
module.exports = router;