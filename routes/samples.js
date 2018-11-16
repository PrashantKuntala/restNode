const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// requiring the samples model
const Sample = require('../models/sampleModel');
const getURL = 'http://localhost:8080/samples/';


// GET all samples
router.get('/', (req, res, next) =>{
    Sample.find()
    .select('sampleId sampleName assayType') // returns only those field names from db
    .exec()
    .then(docs => {
        console.log(docs);
        const response = {
            count : docs.length,
            samples : docs.map(doc => {
                return {
                    _id : doc._id,
                    sampleId : doc.sampleId,
                    sampleName : doc.sampleName,
                    assayType : doc.assayType,
                    request:{
                        type : 'GET',
                        url:  getURL + doc._id
                    }
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
        sampleId : req.body.sampleId,
        sampleName : req.body.sampleName,
        assayType : req.body.assayType
    });
    // saving the item into the database using promises
    sample.save().then( result => {
        console.log(result); 
        res.status(201).json({
            message : 'Created the sample',
            sample : {
                _id : result._id,
                sampleId : result.sampleId,
                sampleName : result.sampleName,
                assayType : result.assayType,
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

// HTTP verbs for individual samples
router.get('/:sampleId', (req, res, next) =>{
    const id =  req.params.sampleId;
    Sample.findById(id)
    .select('sampleId sampleName assayType')
    .exec()
    .then(doc => {
        console.log("from Database \n",doc);
        // if the document is not null then send the doc
        if (doc){
            res.status(200).json({
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
                message : "Not Found a Valid Entry"
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
        Info : 'Posted Sample'
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
                url : getURL + id
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