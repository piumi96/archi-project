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
const Trucker = User.Trucker;
const Public = User.Public;


const router = express.Router();
var saltRounds = 10;
var truckDriver = new Trucker();
var publicUser = new Public();

router.post('/register', (req, res) => {
   var username = req.body.username;
   var password = req.body.password;
   var role = req.body.role;

    bcrypt.hash(password, saltRounds, function(err, hash){
        if(role === 'truckDriver'){
            truckDriver.username = username;
            truckDriver.password = hash;
            
            truckDriver.save((err, savedDriver) => {
                if(err){
                    console.log(err);
                    if(err.code === 11000){
                        res.status(501).json({
                            has: true
                        });
                    }
                    else{
                        res.status(500).json({
                            success: false
                        });
                    }
                    
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
            publicUser.password = hash;
            publicUser.save((err, savedPublic) => {
            if(err){
                console.log(err);
                if(err.code === 11000){
                    res.status(501).json({
                        has: true
                    });
                }
                else{
                    res.status(500).json({
                        success: false
                    });
                }
                
            }
            else{
                console.log(savedPublic);
                res.status(200).json({
                    success: true
                });
            }    
                
            })
        }
    })

});


module.exports = router;



