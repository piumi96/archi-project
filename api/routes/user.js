const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const keys = require('../../config/keys');
const userKey = keys.db.username;
const userpw = keys.db.pw;

const db = mongoose.connect('mongodb://'+userKey+':'+userpw+'@ds063946.mlab.com:63946/archi_project');
const User = require('../../database/schemas');


const router = express.Router();
var saltRounds = 10;
var truckDriver = new User();
var publicUser = new User();

router.post('/register', (req, res) => {
   var username = req.body.username;
   var password = req.body.password;
   var role = req.body.role;

    bcrypt.hash(password, saltRounds, function(err, hash){
        if(role === 'truckDriver'){
            truckDriver.username = username;
            truckDriver.password = password;
            truckDriver.save((err, savedDriver) => {
                if(err){
                    console.log(err);
                    res.status(500).json({
                        success: false
                    });
                }
                else{
                    console.log(savedDriver);
                    res.status(200).json({
                        success: true
                    });
                }
            });
        }
        else if(role === 'public'){
            publicUser.username = username;
            publicUser.password = password;
            publicUser.save((err, savedPublic) => {
            if(err){
                console.log(err);
                res.status(500).json({
                    success: false
                });
            }
            else{
                console.log(savedDriver);
                res.status(200).json({
                    success: true
                });
            }    
                
            })
        }
    })

   /* var newUser = new User();
   newUser.username = username;
   newUser.password = password;    
    newUser.save(function(err, savedUser){
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        else{
            res.status(200).send(savedUser);
            return console.log(savedUser);
        }
   });  
 */
});


module.exports = router;



