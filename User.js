let  mongoose = require("mongoose")

let Schema = new mongoose.Schema({
    
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
      
    }  ,
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    }

})

let User = new mongoose.model("User",Schema)

module.exports= User