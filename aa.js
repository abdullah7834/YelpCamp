const bcrypt = require('bcrypt')

// The more salt you add on the password the more it will take the time to hash it 
const hashPassword  = async(pw)=>{
    // const salt = await bcrypt.genSalt(12);
    // we can do this only in one line ::
    const hash = await bcrypt.hash(pw , 12)
    // console.log(salt)
    console.log(hash)
}

const login = async(pw , hashedPW)=>{
    const result = await bcrypt.compare(pw , hashedPW)
    if(result){
        console.log('Successfully Logged In')
    }else{
        console.log("Incorrect Password")
    }
}
// hashPassword('#Jahan345');
login('#Jahan345' , '$2b$12$Y4YTqYgS1yJVQsshuCz2WOSeLSANYOGFwh6n7guGQZYKg2hLBUFTu')
