const { json } = require('express');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const router= require('express').Router();


// ************************************
// Create new Submission
// NOTE: assignmentId and userId in both body and param

router.post("/:userId/add/:assignmentId",async(req,res)=>{
    try {

        if(req.body.userId!==req.params.userId){
            return res.status(403).json("Unauthorised Action");
        }

        const assignment=await Assignment.findById(req.params.assignmentId);
        if(!assignment){
            return res.status(401).json("No such assignment");
        }

        const newSubmission=new Submission({
            submittedBy:req.body.userId,
            assignment:req.body.assignmentId,
            link:req.body.link
        });

        if(req.params.comment){
            newSubmission.comment=req.params.comment;
        }

        const savedSubmission=await newSubmission.save();
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
// NOTE: userId and submissionId in param abd body

router.delete("/:userId/delete/:submissionId",async(req,res)=>{
    try 
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised operation");
        }

        const submission=await Submission.findById(req.body.submissionId);
        if(req.params.userId!==submission.submittedBy){
            return res.status(403).json("Unauthorised operation");
        }

        Submission.findByIdAndDelete(submission._id);
        res.status(200).json("Deleted");
    }
    catch (error){
        res.status(500).json(error);   
    }
});

// **************

module.exports=router;