const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Token = require('../model/Token');

router.post('/',[
      body('password','Name must be atleast 5 characters').isLength({ min: 5 }),
  ],asyncHandler(async(req,res)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {username,password} = req.body;
      if(!username| !password)
          {
              return res.status(401).json("Enter correct credentails");
          }
      const user = await User.findOne({username});
      if(!user)
      {
          return res.status(404).json("User doesn't exist ");
      }
      const validate = await bcrypt.compare(password,user.password)
      if(!validate)
      {
          return res.sendStatus(401).json("Password not matched")
      } 


    //Send confirmation email//
        let token = await Token.findOne({userId:user._id})
        // console.log("token", token);
       if(user.isVerified === false)
       { 
           if(!token){
            token =await new Token({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex"),
            }).save();
            const url =`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
            await sendEmail(user.email,"Verify email",url);
            return res.status(400).send({message:"An email send to your account for verification"});
        }
    }
 //------------------------------------------//
          
    if(user.isVerified === true){
        try {
            const {password ,...others} = user._doc
            return res.status(200).send({message:"Login successfully" });
            
        } catch (error) {
            return res.status(500).send({message:error.message});
        }
    }
    else{
        return res.status(505).send({message:"Verify your email first"})
    }

  }))


router.get("/:id/verify/:token", async(req,res) =>{
      try {
            const user = await User.findOne({_id:req.params.id})
            if(!user){
                  return res.status(400).send({message:"Invalid link"});
            }
            const token = await Token.findOne({
                  userId:user._id,
                  token:req.params.token,
            })
            if(!token) return res.status(401).send({message:"Invalid link"});
           const newUser= await User.findByIdAndUpdate(user._id,{isVerified:true});
           
            await Token.findByIdAndDelete(token._id);

            res.status(200).json(newUser);
      } catch (error) {
            return res.status(500).send({message:"Internal server error"});
      }
})

module.exports = router;