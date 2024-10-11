const mongoose = require('mongoose')
const {Schema} = mongoose ;
mongoose.connect('mongodb://localhost:27017/relationShipDB')
.then(()=>{
    console.log("Connection Open!!")
}).catch(e =>{
    console.log("Oh got an Error" , e)
})


const   productSchema = new Schema({
    name : String ,
    price : Number ,
    season : {
        type : String ,
        enum :['Summer' , 'Spring' , 'Fall' ,'Winter']
    }
})
const farmSchema = new   Schema({
    name : String ,
    city : String,
    products : [{type : Schema.Types.ObjectId , ref : 'Product'}] 
  })

const Product = mongoose.model('Product' , productSchema)
const Farm = mongoose.model('Farm' , farmSchema)

// Product.insertMany([
//     { name  : "Apple" , price : 3.99 , season :'Spring'},
//     { name  : "Mango" , price : 3.99 , season :'Summer'},
//     { name  : "Water Melon" , price : 3.99 , season :'Summer'}
// ])


const makeForm = async ()=>{
    const farm = new Farm({name : "Animal Form", city : "Chakwal" ,  })
    const mango = await Product.findOne({name  : "Mango"})
    farm.products.push(mango)
    await farm.save();
    console.log(farm)
}


const addProduct = async ()=> {
    const farm  = await Farm.findOne({name : "Animal Form "})
    const melon  = await Product.findOne({name : "Water Melon"})
    farm.products.push(melon)
    farm.save()
    console.log(farm)
}

Farm.findOne({name :"Animal Form" })
.populate('products')
.then(farm => console.log(farm))