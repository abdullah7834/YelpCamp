const mongoose = require('mongoose');

const Review = require('./review');
const { type } = require('os');
const Schema = mongoose.Schema;


const imageSchema= new Schema({
    url : String,
    filename:String,
})

imageSchema.virtual('thumbnail').get(function(){
return  this.url.replace('/upload' , '/upload/w_200')

})

const campgroundschema = new Schema({
    
    title:String , 
    price : Number,
    images:[imageSchema],
    description : String ,
    location : String , 
    author :{
        type : Schema.Types.ObjectId,
        ref :'User'
    },
    reviews : [
        {
            type : Schema.Types.ObjectId ,
            ref : 'Review'
        }
    ]
})


campgroundschema.post('findOneAndDelete' , async function(doc){
    if(doc){
        await Review.deleteMany({_id : {$in : doc.reviews}})
    }
})


module.exports= mongoose.model('CampGround' , campgroundschema)