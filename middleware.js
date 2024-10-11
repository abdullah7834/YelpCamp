
const {campgroundSchema , reviewSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError.js')
const CampGround = require('./models/campground.js')  
const Review = require('./models/review.js')

module.exports. isLoggedin = (req , res , next)=>{
     //  isAuthenticated is middleware of the passport and is used   to check wether the user is logrd in then allowed to perform soemthing and if not it will send it to login page ::
     if(!req.isAuthenticated()){
      req.session.returnTo = req.originalUrl;
        req.flash('error' , 'You are not logeedIn')
      return  res.redirect('/login')
    }
    next();
}

module.exports . validateCampground = (req , res  , next) =>{ 
  const {error} =  campgroundSchema.validate(req.body);
  if(error){
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg , 400)
  }else{
      next()
  }

}
module.exports. isAuthor = async(req , res , next)=>{
  const {id} = req.params ;
  const campground = await CampGround.findById(id);
  if(!campground.author.equals(req.user._id)){
      req.flash('error' , 'You have no permission to do that ')
   return  res.redirect(`/campgrounds/${id}`)
  }
  next();
  
}

module.exports. isReviewAuthor = async(req , res , next)=>{
  const {id , reviewId} = req.params ;
  const review = await Review.findById(reviewId);
  if(!review.author.equals(req.user._id)){
      req.flash('error' , 'You have no permission to do that ')
   return  res.redirect(`/campgrounds/${id}`)
  }
  next();
  
}
module.exports. validateReview  = (req , res  , next) =>{
  const {error} = reviewSchema.validate(req.body);
  if(error){
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg , 400)
  }else{
      next()
  }

}

