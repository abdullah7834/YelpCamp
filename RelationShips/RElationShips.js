const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationShipDB')
.then(()=>{
    console.log("Connection Open!!")
}).catch(e =>{
    console.log("Oh got an Error" , e)
})


const userSchema = new mongoose.Schema({
    first: String ,
    last : String ,
    addresses: [
        {
            street : String ,
            city : String ,
            state : String ,
            zip : Number ,
           
        }
    ]
})

const User = mongoose.model('User' , userSchema)

const makeUser = async ()=>{
    const u = new User({
        first : "Abdullah",
        last : "Javaid" ,

    })
    u.addresses.push({
        street : "Ashraf Town " ,
        city : "Chakwal",
        state :"Punjab",
        zip:4800

    })
    const res = await u.save()
    console.log(res)
}
makeUser()