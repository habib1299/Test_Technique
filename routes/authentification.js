const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
const User = require('../models/user');


//api authentification
router.post('/', async(req,res) =>{
const user = await User.findOne({ username: req.body.username });

if(!user)
{ return res.status(401).send('username is wrong ! ');
}
else{
      if(user.password!=req.body.password) return res.status(405).send('password invalid !!');
}
if(user.status!= 'Active') return res.status(400).send({message: "Pending Account. Please verify your email!"});

const userId = user._id;
return res.send('Vous Etes Connectés et votre id est : '+ userId);
});

//CONFIRMATION
router.get('/confirmation/:confirmationCode',async(req,res)=>{
      const finduserByToken = await User.findOne({confirmationCode : req.params.confirmationCode});
      if(!finduserByToken)res.status(500).send("token not found");
     
      finduserByToken.status = 'Active';
      finduserByToken.save();
      console.log('my token est: ' +finduserByToken);
      // console.log('my confirmation code ' +req.params.confirmationCode)
      // try{
      // const user1 = User.findOne({confirmationCode : req.params.confirmationCode});
      //       user1.status = "Active";
      //       const final = await user1.save();
      //       consol.log('final user'+final);
      // }catch(err){
      //       res.send('errorrrr'+err)
      // }
    
   }); 
module.exports = router