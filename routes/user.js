const express = require('express');
const router = express.Router();
const User = require('../models/user')
const sendEmail = require('../config/sendMail')
var jwt = require('jsonwebtoken')
const SECRECT ="ztgàîozef=à)çi$^m*ùd!:az$dp$^dd*ù:xopzifjazpodijc;,pdazpoi^$ù:";

//API REGISTER USER POST

router.post('/', async(req,res) =>{
    //check for email is used or no
    const emailExist = await User.findOne( { email: req.body.email } );
    if(emailExist) return res.status(401).send('Email is already used try again ..');

    //check for username is used or no
    const usernameExist = await User.findOne({ username : req.body.username });
    if(usernameExist) return res.status(402).send('Username is already exists');

    //check for password minimum length  less than 6 or no
    const passwordLength =req.body.password;
    if(passwordLength.length<3) return res.status(403).send('password is short, atleast 3 characters');
    const token = jwt.sign({email: req.body.email},SECRECT)
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmationCode: token
    });
    try{
       const user1 = await user.save();     
       await sendEmail(user.email,user.confirmationCode);
       res.send("email sent to your account please verify" +user.email)
    }catch(Err){
        res.status(400).send('Error'+Err);
    }
})

//api GET USER

router.get('/', async(req,res) =>{
    try {
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.send('Error' + err)
    }
 })
 // API GET BY ID USER
 router.get('/:id', async(req,res) =>{
     try {
         const user = await User.findById(req.params.id)
         res.json(user)
     }catch(err){
         res.send('Error' + err)
     }
  })
  


module.exports = router