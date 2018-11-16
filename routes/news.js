const express = require('express');
const router = express.Router();

// HTTP verbs for all samples
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message : 'Handling GET requests to /news',
        Info:'retrieve latest news'
    });
});

router.post('/', (req, res, next) => {

    // creating a news object from the request
    const newsItem = {
        date : req.body.date,
        news : req.body.news
    }

    res.status(201).json({
        message : 'Handling POST requests to /news',
        Info : 'posted latest news',
        created : newsItem
    });
});


// export the router
module.exports = router;