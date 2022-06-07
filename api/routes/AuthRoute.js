const router= require('express').Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');

router.post("/signUp",async(req,res)=>{
    try {

        console.log("signup");

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });

        const registeredUser=await newUser.save();
        res.status(200).json(registeredUser);

    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});


router.post("/login",async(req,res)=>{
    try {

        console.log("login");

        const user=await User.findOne({email:req.body.email});
        !user && res.send(400).json("Invalid Credentials");

        const isValid=await bcrypt.compare(req.body.password,user.password);
        !isValid && res.send(400).json("Invalid Credentials");

        const { password, ...others }= user._doc;
        res.status(200).json(others);
    } 

    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

module.exports=router;