let express = require("express")
let mongoose = require("mongoose")
let route = require("./Route")
require('dotenv').config()



let app = express()

app.use(express.json())

let dbConection = async()=>{
try{
    await    mongoose.connect('mongodb://127.0.0.1:27017/blog')
    console.log("mongose connection success")   
}catch(err){
    console.log("mongose connection failed")
}
}


app.use(route)

app.listen(process.env.PORT,async()=>{
    console.log("server is running")
console.log(process.env.PORT)    

    await dbConection()
})