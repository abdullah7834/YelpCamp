const mongoose = require('mongoose')
const {Schema} = mongoose ;
mongoose.connect('mongodb://localhost:27017/relationShipDB')
.then(()=>{
    console.log("Connection Open!!")
}).catch(e =>{
    console.log("Oh got an Error" , e)
})


const   userSchema = new Schema({
    name : String ,
    age : Number ,
})
const tweetSchema = new   Schema({
    text : String ,
    likes : Number , 
    user : {type: Schema.Types.ObjectId , ref : "User"}
  })

const User  = mongoose .model('User' , userSchema)
const Tweet = mongoose.model('Tweet' , tweetSchema)

// const makeTweets = async () =>{
//     // const user  = new User({name : "Abdullah" , age  : 24})
//     const user  = await User.findOne({name : "Abdullah"})
//     const tweet2 = new Tweet({text : "My second tweet " , likes : 555})
//     tweet2.user = user  ;
//     tweet2.save();
// }
// makeTweets()

const  findTweets = async ()=>{
    const t = await Tweet.find({}).populate('user')
    console.log(t)
}

findTweets() 