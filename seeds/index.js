const mongoose = require('mongoose')
const cities = require('./cities')
const CampGround = require('../models/campground')



const{descriptors , places} = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>{
    console.log("Database Connected Successfully")
}).catch(err =>{
    console.log("Error In Connection" , err)
})

const sample = array => array[Math.floor(Math.random() * array.length)] ; 

const seedDB = async ()=>{
    await CampGround.deleteMany({});
    for(let i=0 ; i<=50 ; i++){
        const random100 = Math.floor(Math.random() *1000)
        const price= Math.floor(Math.random() *20) +10;
        const camp = new CampGround({
            author: '66d42c1717c5840d6b5d0ce1',
            location : `${cities[random100].city} , ${cities[random100].state}`,
            title : `${sample(descriptors)} ,  ${sample(places)}`,
            description:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, consequuntur nisi voluptas delectus non ipsam totam voluptatum beatae laborum dolores, consequatur culpa laudantium velit quo nesciunt veniam aliquam magni cupiditate!',
            price ,
            images: [
                {
                    url: 'https://res.cloudinary.com/de3wloudw/image/upload/v1726290028/YELPCAMP/g2lrpmxkektfjsrfv4te.jpg',
                    filename: 'YELPCAMP/g2lrpmxkektfjsrfv4te',
                  
                  },
                {
                  url: 'https://res.cloudinary.com/de3wloudw/image/upload/v1726290027/YELPCAMP/blfq9ldlriufwodtwhnx.jpg',
                  filename: 'YELPCAMP/blfq9ldlriufwodtwhnx',
                
                }
               
              ],

        })
      await camp.save()
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})
