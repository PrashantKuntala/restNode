const express = require('express');
const router = express.Router();

// HTTP verbs for all samples
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message : 'Handling GET requests to /samples'
    });
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message : 'Handling POST requests to /samples'
    });
});

// HTTP verbs for individual samples
router.get('/:sampleId', (req, res, next) =>{
    const id =  req.params.sampleId;
    if (id !== 'null'){
        res.status(200).json({
            message : 'Handling GET requests to /samples/:sampleId'
        });
    } 
    else{
        res.status(200).json({
            Error : 'SampleID is missing or wrong'
        });
    }   
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
    res.status(200).json({
        message : 'Handling DELETE requests to /samples/:sampleId',
        Info : 'deleted sample'
    });
});


// export the router
module.exports = router;