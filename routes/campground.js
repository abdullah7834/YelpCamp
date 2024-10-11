const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const CampGround = require('../models/campground')
const campgrounds = require('../controllers/campgrounds.js')
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload =multer({storage})

const {isLoggedin , validateCampground , isAuthor} = require('../middleware.js')


router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedin ,  upload.array('image') , validateCampground , catchAsync(campgrounds.newFrom))


  router.get('/new' ,isLoggedin ,  campgrounds.renderNewForm)
  
router.route('/:id')
  .get(catchAsync( campgrounds.findCampground))
  .put(isLoggedin ,isAuthor,upload.array('image') , validateCampground ,catchAsync( campgrounds.editCampground))
  .delete( isLoggedin  , isAuthor ,catchAsync( campgrounds.deleteCampground))




router.get('/:id/edit' , isLoggedin , isAuthor , catchAsync( campgrounds.editCampgroundForm))



 
module.exports = router ; 