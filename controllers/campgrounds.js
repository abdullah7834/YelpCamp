const CampGround = require('../models/campground')
const {cloudinary} = require('../cloudinary')

module.exports.index = async(req , res) =>{
    const campgrounds = await CampGround.find({})
    res.render('campgrounds/index' , {campgrounds})
}

module.exports.renderNewForm =  (req , res) =>{
    res.render('campgrounds/new')
}

module.exports.newFrom =async (req , res , next)=>{

    const campground = new CampGround(req.body.campground)
    campground.images=req.files.map(f =>  ({url : f.path , filename : f.filename}));
    campground.author = req.user._id;
    await campground.save() ; 
    req.flash('success' , 'Successfully made a new CampGround')
    res.redirect(`/campgrounds/${campground._id}`)

}



module.exports.findCampground =async (req , res) =>{
    const {id} = req.params ;
    //  we use the nested populate inside this one ::
    const campground = await CampGround.findById(id).populate({path : 'reviews' , populate:{path : 'author'}}).populate('author')
    if(!campground){
        for(let filename of req.body.deleteImages){
         await cloudinary.uploader.destroy(filename)
        }
        req.flash('error' , 'Cannot Find that Campground')
      return   res.redirect('/campgrounds')
    }
    res.render('campgrounds/show' , {campground})  
}



module.exports.editCampgroundForm = async(req , res) =>{
    const {id} = req.params ;
    const campground = await CampGround.findById(id)
    if(!campground){
        req.flash('error' , 'Cannot Find that Campground')
      return   res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit' , {campground})
}


module.exports.editCampground = async(req , res) =>{
    const {id} = req .params ;
    //  here we first find one and then we compare ids then gave a permission to update if he is  a author 
    const campground=  await CampGround.findByIdAndUpdate(id , {...req.body.campground} , {new : true , runValidators: true});
    const imgs =   campground.images=req.files.map(f=>({url : f.path , filename : f.filename}));
    campground.images.push(...imgs);
    await campground.save()
    if(req.body.deleteImages){
     await campground.updateOne({$pull : {images :{filename :{$in : req.body.deleteImages }}}})
     console.log(campground)
    }
    req.flash('success' , 'Successfully Updated Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}


module.exports.deleteCampground = async(req , res)=>{
    const {id} = req.params ;
    await CampGround.findByIdAndDelete(id)
    req.flash('success' , 'Successfully Deleted Campground')
    res.redirect('/campgrounds')
}