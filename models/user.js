const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema ;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    email:{
        type : String ,
        required : true,
        unique : true , 
    }
})
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User' , userSchema)