//  This route only offers GET all published samples for YEP 
//  and
//  GET samples based on a protein name

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load the configuration
const Config = require('../config.json');

// requiring the samples model
const Sample = require('../models/sampleModel');
const getURL = Config.publicEndpoint;
const imageURL = Config.imageURL;

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
                        // isPublic:doc.isPublic,  // we are sending only public samples 
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
                        // isPublic:doc.isPublic,  // we are sending only public samples
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