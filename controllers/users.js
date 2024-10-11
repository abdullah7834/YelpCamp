const User = require('../models/user')
const  passport  = require('passport')


module.exports.renderRegister =  (req , res)=>{
    res.render('users/register')
}
 
module.exports.createNewUser = async(req , res)=>{
    try{
        const {email , username , password} = req.body;
        const user = new User({email , username})
        const registereduser = await User.register(user , password)
        req.login(registereduser , err => {
            if(err) return next(err)
            req.flash('success' , 'Welcome to campground')
            res.redirect('/campgrounds');
        })
    }catch(e){
        req.flash('error' , e.message);
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req , res)=>{
    res.render('users/login')
}

module.exports.authUser =   async (req, res) => {
    req.flash('success', 'Welcome Back');
     const  redirectUrl = req.session.returnTo || '/campgrounds';
    await delete req.session.returnTo;
    req.session.save(() => {
      res.redirect(redirectUrl);
    });
  }

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err); // Pass errors to the error handler
      }
      req.flash('success', 'Goodbye!');
      res.redirect('/campgrounds'); // Redirect the user after successful logout
    });
  }