let  mongoose = require("mongoose")

let Shema = new mongoose.Schema({
    
    title:{
        type:String,
        required: true,
        trim:true
    },
    address:String,
    hobby:String,
 
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
}],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})

let Profile = new mongoose.model("Profile",Shema)

module.exports= Profile