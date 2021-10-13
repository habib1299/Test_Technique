const express = require('express')
const mongoose = require('mongoose')
const app = express()
const URL ='mongodb://localhost:27017/TesTechnique'
const config = require('config')
mongoose.connect(URL,{useNewUrlParser:true, useUnifiedTopology: true})

const con = mongoose.connection

con.on('open',()=>{
    console.log('Connected...');
})
app.use(express.json({ extented : false }));


//aPI POST CONFIRMATION MAIL

//Register USER API POST
const userRouter = require('./routes/user');
app.use('/user',userRouter);

//LOGIN USER API POST
const authRouter = require('./routes/authentification');
app.use('/auth',authRouter);


//API URL Shortness 
const urlRouter = require('./routes/url');
app.use('/url',urlRouter);

app.use('/', require('./routes/index'));


app.listen(3001,() => {
    console.log('Server started')
})