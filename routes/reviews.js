const express = require('express')
const router = express.Router({mergeParams : true})
const catchAsync = require('../utils/catchAsync')
const { reviewSchema} = require('../schemas.js')
const ExpressError = require('../utils/ExpressError')
const Review = require('../models/review')
const reviews = require('../controllers/reviews.js')
const CampGround = require('../models/campground')
const {validateReview , isLoggedin, isReviewAuthor} = require('../middleware.js')
const review = require('../models/review')







router.post('/' ,isLoggedin , validateReview ,  catchAsync(reviews.createReview))
 
 
 
 router.delete('/:reviewId' ,isLoggedin , isReviewAuthor ,  catchAsync(reviews.deleteReviews))


 module.exports = router ; 