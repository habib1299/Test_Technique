 const nodemailer = require('nodemailer');
 const express = require('express');
 const router = express.Router();
 const User = require('../models/user')

 const sendEmail = async(email,confirmationCode) =>{
     try {
         const transporter = nodemailer.createTransport({
             host: 'smpt.gmail.com',
             service: "gmail",
             port: 578,
             domain: 'gmail.com',
             secure: true,
             auth:{
                 user: "put ur email here",
                 pass: "your password here"
             },
             authentication: 'plain',
             enable_starttls_auto: true 
         })
         const url = `http://localhost:3001/auth/confirmation/${confirmationCode}`
         await transporter.sendMail({
             from: "put your email here",
             to: email,
             subject: 'Confirm Email',
             html:`
             <h2>Please click on given link to activate your account</h2>
             <a href=${url}>${url}</a>`
         });
         console.log("email sent successfully")
     }catch(error){
         console.log("email not sent"+error)
     }
 }
 module.exports = router;
 module.exports = sendEmail;