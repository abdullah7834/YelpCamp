const express = require('express')
const router  = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const  passport  = require('passport')
const users = require('../controllers/users.js')
const {isLoggedin} = require('../middleware.js')



router.route('/register')
  .get(users.renderRegister)
  .post(catchAsync( users.createNewUser))

router.route('/login')
  .get(users.renderLogin)
  .post(passport.authenticate('local', { 
    failureFlash: true, 
    failureRedirect: '/login' 
  }) ,users.authUser);
  

router.get('/logout', users.logoutUser);
  

module.exports = router ;