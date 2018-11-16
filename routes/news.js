const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// requiring the news model
const News = require('../models/newsModel');
const getURL = 'http://localhost:8080/news/';

// HTTP verbs for all samples
router.get('/', (req, res, next) =>{
    News.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json({
            count : docs.length,
            news : docs.map(doc =>{
                return {
                    _id : doc._id,
                    sample : doc.sample,
                    sampleCount:doc.sampleCount,                    
                    request: {
                        type : 'GET',
                        description : 'This is not set up yet',
                        url : getURL + doc._id
                    }
                }
            })           
        });        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });        
    });
});

router.post('/', (req, res, next) => {

    // We need to make sure we dont add news that dont have sampleId

    // check for an existing news item
    News.findById(req.body.sampleId)
    .then(sample => {
       
        // if (!sample){
        //     return res.status(404).json({
        //         message: 'Sample Not Found'
        //     });
        // }
    // creating a news object from the model
    const news = new News({
        _id:mongoose.Types.ObjectId(),
        sampleCount : req.body.sampleCount,
        sample : req.body.sampleId
    });

    // save the item
    return news.save();
    }).then(result => {
        console.log(result);
        res.status(201).json({
            sample : {
                _id: result._id,
                sample : result.sample,
                sampleCount: result.sampleCount
            },
            request: {
                type : 'GET',
                description : 'This is not set up yet',
                url : getURL
            }
        });
        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Sample Not Found',
            error : err
        });
    }); 
    
});


// export the router
module.exports = router;