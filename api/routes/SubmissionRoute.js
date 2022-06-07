const { json } = require('express');
const Submission = require('../models/Submission');
const router= require('express').Router();


// ************************************
// Create new Submission

router.post("/addSubmission",async(req,res)=>{
    try {

        if(!(req.body.teamsId && req.body.userId)){
            return json.status(400).send("Need both teams and user Id");
        }

        // const team=teamCon

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


// ************************
// Delete Submission

router.delete("/deleteSubmission",async(req,res)=>{
    try 
    {
        const submission=await Submission.findById(req.body.submissionId);
        if(req.body.userId==submission.submittedBy)
        {
            // Delete submission
            // Delete submission Id from teams
            // Delete submission Id from User
        }
    }

    catch (error) 
    {
        
    }
});

// **************

module.exports=router;