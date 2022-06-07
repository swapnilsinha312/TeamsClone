const router= require('express').Router();
const User=require('../models/User');
const Submission = require('../models/Submission');
const bcrypt=require('bcrypt');



// *************************************
// GET one user

router.get('/:id', async(req,res)=>{
    try {
        const user= await User.findById(req.params.id);
        const {password,...others}=user._doc;
        res.status(200).json(others);
    } 
    catch (error) {
        res.status(500).json(error);
    }
});
// *************************************






// *****************************************
// UPDATE
// This needs the user ID to be sent in the req body

router.put("/:id",async(req,res)=>{

        if(req.body.userId===req.params.id){
            if(req.body.password){
                const salt=await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(req.body.password,salt);
            }

            try {
                const updatedUser= await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },{new:true});
                res.status(200).json(updatedUser);
            } 
            catch (error) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("Others account not accesible");
        }
});
// *****************************************




// *****************************************
// Delete a user

// Needs change on deletion submissions and teams need to be changed

router.delete("/:id",async(req,res)=>{

    if(req.body.userId===req.params.id){
        
        try{
            const user=User.findById(req.params.id);
            try {
                await Post.deleteMany({email:user.email});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Deleted");
            } 
            catch (error) {
                res.status(500).json(err);
            }
        }
        catch{
            res.status(404).json("No such user");
        }
    }
    else{
        res.status(401).json("Others account not accesible");
    }
});
// *****************************************






// ***************************************************
// Adding a submission to a user
// Also adding the present date to the activity log

router.put("/:userId/addSubmission/:submissionId",async (req,res)=>{
    try{
        const submission=await Submission.findById(req.params.submissionId);
        if(submission.submittedBy==req.params.userId)
        {
            // const user=User.findById(req.params.userId);
            // user.submissions.push(req.params.submissionId);
            // user.save();

            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { submissions: req.params.submissionId } },
                { upsert: true },
            );
            
            const updatedUser=User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { activityLog: Date.now() } },
                { upsert: true },
                { new:true }
              );
            
            return res.status(200).json(updatedUser);
        }
        else{
            res.status(403).json("You are not authorized");
        }
    }
    catch{
        return res.status(400).json("Error");
    }
});

// ***********************************






module.exports=router;

