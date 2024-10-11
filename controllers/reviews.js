const Review = require('../models/review')
const CampGround = require('../models/campground')

module.exports.createReview= async(req ,res)=>{
    const campground = await CampGround.findById(req.params.id) ;
    const review = new Review(req.body.review);
    review.author= req.user._id ;
 campground.reviews.push(review) ;
 await  review.save(); 
 await  campground.save();
 req.flash('success' , 'Review added Successfully!')
 res.redirect(`/campgrounds/${campground._id}`)
 }


 module.exports.deleteReviews = async(req ,  res )=>{
    const {id , reviewId} = req.params ;
    await CampGround.findByIdAndUpdate(id , {$pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success' ,'Successfully deleted the review' );
      res.redirect(`/campgrounds/${id}`)
    
   }