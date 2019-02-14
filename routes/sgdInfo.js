const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// requiring the samples model
const SGDInfo = require('../models/sgdModel');

// GET all samples
router.get('/', (req, res, next) =>{
    SGDInfo.find()
    // .select('sampleId sampleName assayType') // returns only those field names from db
    .exec()
    .then(docs => {
        console.log(docs);
        const response = {
            count : docs.length,
            sgdInfo : docs     
        }
        res.status(200).json(response);        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });        
    });   
});

// Post all samples ( this is handling one sample now), 
// maybe you need to use map if there is more than one sample
// remember the user doesn't send the id
router.post('/', (req, res, next) =>{
   
    // creating a new object for sample
    const sgdInfo = new SGDInfo({
        _id: new mongoose.Types.ObjectId(),
        featureName: req.body.featureName,
        standardGeneName: req.body.standardGeneName,
        commonName: req.body.commonName,
        sgdId: req.body.sgdId,
        alias: req.body.alias,
        description: req.body.description,
        featureType: req.body.featureType,
        featureQualifier: req.body.featureQualifier,        
    });
    // saving the item into the database using promises
    sgdInfo.save().then( result => {
        // console.log(result); 
        res.status(201).json({
            message : 'Created the sample',
            sgdInfo : {
                _id : result._id,            
                featureName: result.featureName,
                standardGeneName: result.standardGeneName,
                commonName: result.commonName,
                sgdId: result.sgdId,
                alias: result.alias,
                description: result.description,
                featureType: result.featureType,
                featureQualifier: result.featureQualifier,                
            } 
        });       
    }).catch(err => {console.log(err),
        res.status(500).json({error : err});
    });    
});

// HTTP verbs for individual proteins
//  Need to implement commonname and alias based searches too, could be done on the front end.
//  to hash out the corresponding standardGeneName for the alias before making the request.
router.get('/:proteinName', (req, res, next) =>{
    const proteinName =  req.params.proteinName.toUpperCase();
    SGDInfo.find({'standardGeneName':proteinName})
    // .select('sampleId standardGeneName assayType')
    .exec()
    .then(docs => {
        console.log("from Database \n",docs);
        // if the document is not null then send the doc
        if (docs.length > 0){
            res.status(200).json({
                count : docs.length,
                sgdInfo : docs
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

// export the router
module.exports = router;