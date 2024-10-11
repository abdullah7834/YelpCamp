const express = require('express')
const app = express()
const morgan  = require('morgan')
const AppError = require('./AppError')

app.use(morgan('tiny'))
app.use((req , res , next)=>{
//  Ehatever REquest it is we are making it  a get request by adding the line below::
// req.method = 'GET';
     req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
 
})

app.use('/dogs' , (req , res , next)=>{
    console.log(" I Love DOGS")
    next()
})
const verifyPassword = ((req , res , next)=>{
    const {password} = req .query;
    if(password === "Abdullah"){
        next()
    } 
    
    throw new AppError('Password Required' , 401);
})
// app.use((req , res , next)=>{
//     console.log("Hey I am running second ")
//     next();
// })

app.get('/error' , (req, res)=>{
    chicken.fly()
})
app.get('/dogs' , (req , res) =>{
    console.log(`REQUEST DATE IS ${req.requestTime}`)
    res.send("Woof")
})
app.get('/secret' ,verifyPassword ,  (req , res) =>{
    res.send(" SECRET IS : I wanna Rely on someone fully :(");
})

app.get('/admin' , (req , res) =>{
    throw new AppError('You are not allowed' , 403)
})
// app.use((req , res) =>{
//     res.status(404).send("NOT FOUND!!!")
// })
app.use((err , req , res , next)=>{
    const {status = 500 , message = "Something went wrong"} = err;
    res.status(status).send(message)
    // res.status(500).send("OH BOY WE GOT AN ERROR !!!!")
    
})

app.listen(5000 , ()=>{
    console.log("App is listening on port 5000")
})