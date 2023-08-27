let  mongoose = require("mongoose")

let Shema = new mongoose.Schema({
    
    title:{
        type:String,
        required: true
    },
  body:{
        type:String,
        required: true,
        
    },
  likes:Number ,
    
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"profile"
    }

})

let Post = new mongoose.model("Post",Shema)

module.exports= Post