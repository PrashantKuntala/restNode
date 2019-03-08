const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// retrieve the configuration
const Config = require('../config.json');

// requiring the user model
const User = require("../models/userModel");

// load the authentication middleware
const checkAuth = require('../middleware/checkAuth');

// route for the user signup
router.post("/signup", (req, res, next) => {
  
  // checking if a user with the email exists
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "E-Mail exists"
        });
      } else {

        //   creating a hash of the password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            
            //  creating the new user
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

// user login route
router.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id
              },
              Config.JWT_KEY,
              {
                  expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

// route to retrive all existing users
router.get('/', checkAuth, (req, res, next) =>{
  User.find()  
    .exec()
    .then(docs => {
        console.log(docs);
        const response = {
            count : docs.length,
            users : docs.map(doc => { 
                return {
                    _id : doc._id,
                    email: doc.email,
                    password:doc.password
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
}); 

// Update user roles and details
router.patch('/:userId', checkAuth, (req, res, next) =>{
    const id = req.params.userId;
    const updateOps = {};
    // change only the key value pairs that need to be changed
    for (let ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    // console.log(updateOps);
    
    // updating the data
    User.updateOne({_id : id}, { $set : updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'User Updated',
            sample : result,                      
        });      
    }).catch(err => {
        error : err
    });
});

// route to delete a user
router.delete("/:userId", checkAuth, (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;