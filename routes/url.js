const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/url');

//API POST Url Short
router.post('/shorten',async(req,res)=>{
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');
     //check base url

    if(!validUrl.isUri(baseUrl))return res.status(401).json('Invalid base url');

    //Create url code
    const urlCode = shortid.generate();

    //check long url
    if(validUrl.isUri(longUrl)){
     try{
          let url = await Url.findOne({ longUrl : longUrl })
          if(url){
              res.json(url);
          }else
          {
              const shortUrl = baseUrl + '/' + urlCode;
              url = new Url({
                 longUrl,
                 shortUrl,
                 urlCode,
                 date: new Date()
              });
              await url.save();
            res.json(url);
          }
     }catch(err){
         console.error(err);
         res.status(500).json('Server Error');

     }
    }else{
      res.status(401).json('Invalid long Url');
    }
});

//Get all url 
router.get('/getall', async(req,res)=>{
    const listUrl = await Url.find();
    res.status(200).json(listUrl);
})

module.exports = router