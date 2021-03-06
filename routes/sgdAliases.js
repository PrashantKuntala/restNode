const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// requiring the samples model
const Sample = require('../models/sampleModel');

// load the authentication middleware
const checkAuth = require('../middleware/checkAuth');

// get all aliases and corresponding standard gene names for public samples
router.get('/public', (req, res, next) =>{
   
    Sample.find({"isPublic" :  true })
    .select('standardGeneName alias')
    .exec()
    .then(docs => {     
        // to store all the aliases   
        var aliases = {}

        // if the document is not null then send the doc
        if (docs.length > 0){

            docs.map(doc =>{
                // split the multiple aliases into an array
                let aliasList = doc.alias.split(',');

                //  iterate through each alias
                for(i in aliasList){ 
                   // remove the white spaces and new line characters if any   
                   let temp = aliasList[i].replace(/(\r\n|\n|\r| )/gm, "")

                   // No need to return the samples for the     
                   if(temp !== "NoAlias" && temp !== "NoAliases"){
                    // creating a single object with {alias:standardGeneName}   
                    aliases = {...aliases, [temp] : doc.standardGeneName}
                   }                   
                }                
                return aliases               
            })

            res.status(200).json({
                count : docs.length,
                aliases : aliases
            });
        }
        // send the 404 message
        else{
            res.status(404).json({
                message : "No aliases found",               
                aliases: docs
            });
        }                
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


// get all aliases and corresponding standard gene names for private samples
router.get('/private', checkAuth, (req, res, next) =>{
   
    Sample.find({"isPublic" :  false })
    .select('standardGeneName alias')
    .exec()
    .then(docs => {     
        // to store all the aliases   
        var aliases = {}

        // if the document is not null then send the doc
        if (docs.length > 0){

            docs.map(doc =>{
                // split the multiple aliases into an array
                let aliasList = doc.alias.split(',');

                //  iterate through each alias
                for(i in aliasList){ 
                   // remove the white spaces and new line characters if any   
                   let temp = aliasList[i].replace(/(\r\n|\n|\r| )/gm, "")

                   // No need to return the samples for the     
                   if(temp !== "NoAlias" && temp !== "NoAliases"){
                    // creating a single object with {alias:standardGeneName}   
                    aliases = {...aliases, [temp] : doc.standardGeneName}
                   }                   
                }                
                return aliases               
            })

            res.status(200).json({
                count : docs.length,
                aliases : aliases
            });
        }
        // send the 404 message
        else{
            res.status(404).json({
                message : "No aliases found",               
                aliases: docs
            });
        }                
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


// export the router
module.exports = router;