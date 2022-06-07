const Submission = require('../models/Submission');
const router= require('express').Router();


// ************************************
// Create new Submission

router.post("/addSubmission",async(req,res)=>{
    try {
        const newSubmission=new Submission({
            submittedBy:req.body.userId,
            link:req.body.link
        });

        if(req.params.comment){
            newSubmission.comment=req.params.comment;
        }

        const savedSubmission=await newSubmission.save();

        const updatedUser = await axios({
            method: "post",
            url: `/${req.body.userId}/addSubmission/${savedSubmission._id}`
          });

        //   res.status(200).json(updatedUser);
        res.status(200).json(savedSubmission);

    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

// ************************************


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

// ************************
// Delete Submission

router.delete("/deleteSubmission",async(req,res)=>{
    try 
    {
        const submission=await Submission.findById(req.body.submissionId);
        if(req.body.userId==submission.submittedBy)
        {
            
        }
    }

    catch (error) 
    {
        
    }
});

// **************

module.exports=router;