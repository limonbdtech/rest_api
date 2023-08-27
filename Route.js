let express = require("express");
let User = require("./User")
let Profile = require("./Profile")
let Post = require("./Post")
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
let jwt = require('jsonwebtoken');
let checklogin = require("./Checklogin")
let multer= require("multer")

// const upload = multer(
//   { dest: "./Uploted" }
//   )
let router = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Uploted')
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' +  file.originalname
    cb(null, name )
  }
})

const upload = multer({ storage: storage })


router.post("/signup",async(req,res)=>{
  
    try {
      let hasspassword  = await bcrypt.hash(req.body.password, salt,)
      let user = new User({
          name:req.body.name,
          username:req.body.username,
          password:hasspassword,
          profile:req.body.profile
      })
  let save = await user.save()
  res.json(save)
    } catch (error) {
      res.send(error.message)
    }  
  })

router.post("/login",async(req,res)=>{
    try{
  let user =await User.find({username:req.body.username})
  if(user && user.length>0){
    
    let isValid =await bcrypt.compare(req.body.password,user[0].password)
     if(isValid){
      let token = jwt.sign({ username:user[0].username,userId:user[0]._id },process.env.token_security,{expiresIn:"7d"} );

    res.status(200).json({
      access_token:token,
      message:"login success"
    })
  
   }else{
 res.status(500).json({message:"authentication failed"})
   }
    
  }else{
    res.status(500).json({message:"authentication failed"})
  }



    }
  catch(error){
    // console.log(error)
    res.send("failed to login")
  }
  
  })

router.post("/profile/:profileID", checklogin, async(req,res)=>{
  
    try {
      let profileID = req.params.profileID
      let profile = new Profile({
          title:req.body.title,
          address:req.body.address,
          hobby:req.body.hobby,
         profile:profileID
      })
  let save = await profile.save()
  let result = await User.findOneAndUpdate({_id:profileID},{$set:{profile:save._id}},{new:true})
  res.json(save)
    } catch (error) {
      res.send(error.message)
    }  
  })

router.post("/post/:postId", checklogin,async(req,res)=>{
  
    try {
      let postId = req.params.postId
      let post = new Post({
          title:req.body.title,
          body:req.body.body,
          likes:req.body.likes,
          profile:postId
      })
  let save = await post.save()
  let result = await Profile.findOneAndUpdate({_id:postId},{$push:{posts:save._id}},{new:true})
  res.json(save)
    } catch (error) {
      res.send(error.message)
    }  
  })
  
  router.get("/profile",checklogin, async(req,res)=>{
     
     try {
      
      let users = await Profile.find({}).populate("posts");
      res.json(users)
  
     } catch (error) {
      res.send(error.message)
      console.log(error.message)
     } 
  })


  
  router.post("/",upload.array('avatar',3),(req,res)=>{
    try {
      
      res.sendFile( __dirname + "/index.html")
   
    
    // res.send("i am uplote file")
  } catch (error) {
      res.send(error.message)
  }
  })
  
  module.exports = router