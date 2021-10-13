const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   email:{
       type: String,
       required: [true, 'Email is required'],
       unique: true
   },
   username:{
       type: String,
       required: [true, 'Name is required.']
   },
   password:{
       type: String,
       required: [true, 'password is required']
   },
   status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending'
   },
   confirmationCode: {
      type: String,
      unique: true
   }
})

module.exports = mongoose.model('User',userSchema);