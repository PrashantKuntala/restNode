const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// requiring the samples model
const Sample = require('../models/sampleModel');

// GET all samples
router.get('/', (req, res, next) =>{
    Sample.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);        
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
            message : 'Handling POST requests to /samples',
            created : sample
        });       
    }).catch(err => {console.log(err),
        res.status(500).json({error : err});
    });    
});

// HTTP verbs for individual samples
router.get('/:sampleId', (req, res, next) =>{
    const id =  req.params.sampleId;
    Sample.findById(id).exec().then(doc => {
        console.log("from Database \n",doc);
        // if the document is not null then send the doc
        if (doc){
            res.status(200).json(doc);
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

router.patch('/:sampleId', (req, res, next) =>{
    res.status(200).json({
        message : 'Handling PATCH requests to /samples/:sampleId',
        Info : 'updated sample'
    });
});

router.delete('/:sampleId', (req, res, next) =>{
    const id = req.body.sampleId;
    Sample.remove({_id : id}).exec().then(result=>{
        console.log(result);        
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);        
        res.status(500).json({
            error : err
        })
    });
});


// export the router
module.exports = router;