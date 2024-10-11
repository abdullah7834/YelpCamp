if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}






const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const session = require('express-session');
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override') 
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')


const userRoutes = require('./routes/users.js')
const campgrounds = require('./routes/campground.js')
const reviews = require('./routes/reviews.js')




mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>{
    console.log("Database Connected Successfully")
}).catch(err =>{
    console.log("Error In Connection" , err)
})




const app = express()











app.use(express.urlencoded({extended : true}))
app.engine('ejs' , ejsMate)
app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname , 'Public')))

const cookieExpire =  1000 * 60 * 60 * 24 * 7 ;

const sessionConfig = {
    secret : 'thiscouldbeabettersecret',
    resave : false,
    saveUninitialized : true,
    cookie: {
        httpOnly:true,
        expires : Date.now() + cookieExpire ,
        maxAge : cookieExpire 
    }
}

app.use(session(sessionConfig ))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
// This is use to store the user inside the session
passport.serializeUser(User.serializeUser())
// This is used how to  get user out of that session 
passport.deserializeUser(User.deserializeUser())




app.use((req, res, next) => {
    if (!['/login', '/'].includes(req.originalUrl) && !req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  });


app.use('/' , userRoutes);
app.use('/campgrounds' , campgrounds)
app.use('/campgrounds/:id/reviews' , reviews)






app.all('*' , (req , res , next)=>{
    next(new ExpressError('Page Not Found' , 404))
})  

app.use((err , req , res , next)=>{
    const {statusCode = 500 } = err ;
    if(!err.message) err.message = "Oh No something went wrong" 
    res.status(statusCode).render('error' ,{ err   })
   
})

app.listen(3000 , ()=>{
    console.log("Serving on the Port Number 3000")
})