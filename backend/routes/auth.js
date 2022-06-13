const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Token = require('../model/Token');



router.post('/',[
    body('email','Enter valid email').isEmail(),
    body('username','Name must be atleast 5 characters').isLength({ min: 5 }),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],asyncHandler(async(req,res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {username, email,password} = req.body;

    if(!username|| !password || !email){
       return res.status(401).json("Enter all credentails")
    }

    const userExist = await User.findOne({username})
    const emailExist = await User.findOne({email})
    try {
        if(userExist)
        {
           return res.status(400).json("Username taken")
        }
        if(emailExist)
        {
           return res.status(404).json("Email exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newuser = new User({
            username,
            email,
            password:hashPassword,
        })
        const user = await newuser.save();

        //Create confirmation link//
        const token =await new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex"),
        }).save();
        const url =`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email,"Verify email",url);

        //------------------------//

        return res.status(200).send({message:"Email send to your account "});
    } catch (error) {
        return res.status(505).send({message:"Cannot send email try again later"});
    }
}))

module.exports = router;