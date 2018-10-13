const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('../../config/keys');

const userKey = keys.db.username;
const userpw = keys.db.pw;

const db = mongoose.connect('mongodb://'+userKey+':'+userpw+'@ds063946.mlab.com:63946/archi_project');
const User = require('../../database/schemas');

router.post('/register', (req, res)=>{
   var username = req.body.username;
   var password = req.body.password;

   var newUser = new User();
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

});


module.exports = router;



