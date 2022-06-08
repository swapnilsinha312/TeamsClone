const Assignment= require("../models/Assignment");
const Submission= require("../models/Submission");



const getAll=async(req,res)=>{
    try 
    {
        const submissions= await Submission.find(req.params.assignmentId);
        res.status(200).json(submissions);
    }
    
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
// ***********


// ***********
// Get all the submissions for an assignment
// Only returns all to the author of the assignment 
// NOTE: userId body and param, assignmentId param
const getAllSubmissionsForAssignment=async(req,res)=>{
    try 
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised access");
        }

        const assignment=await Assignment.findById(req.params.assignmentId);
        if(assignment.assignedBy!=req.body.userId){
            return res.status(403).json("Unauthorised access only creator can see all assignments");
        }

        const submissions= await Submission.find({assignment:req.params.assignmentId});
        res.status(200).json(submissions);
    }
    
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
// ***********


//************
// Get all the submissions of a user
// NOTE: Needs userId in body and params
const getUsersEverySubmission=async(req,res)=>{
    try 
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised access");
        }

        const submissions= await Submission.find({
            submittedBy:req.params.userId
        });

        res.status(200).json(submissions);
    }
    
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
// ***********



//************
// Get all the submissions of one user for an assignment
// NOTE: Needs userId in body and params and assignmentId in params
const getUsersSubmissionForOneAssignment=async(req,res)=>{
    try 
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised access");
        }

        const submissions= await Submission.find({
            assignment:req.params.assignmentId, 
            submittedBy:req.params.userId
        });

        res.status(200).json(submissions);
    }
    
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
// ***********



// ******************
// Create Assignment
// NOTE: Need userId in both param and body and assignmentId in body
const createSubmission=async(req,res)=>{
    try {

        if(req.params.userId!==req.body.userId) {
            return res.status(403).json("Unauthorised action");
        }

        const assignment= await Assignment.findById(req.body.assignmentId);

        if(!assignment.isAcceptingSubmissions) {
            return res.status(401).json("Assignment has Stopped Accepting");
        }

        const newSubmission=new Submission({
            submittedBy:req.body.userId,
            assignment:req.body.assignmentId,
            link:req.body.link,
            comment:req.body.comment
        });

        const registeredSubmission=await newSubmission.save();

        // NOTE: The todo has been rendered redundant by the chage in db design
        // TODO: Add Submission to Assignment
        // const result= await addSubmissionToAssignment(req.body.assignmentId,registeredSubmission._id);
        // if(!result) throw new Error();

        res.status(200).json(registeredSubmission);

    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}
// ******************



// ******************
// Stop Accepting assignment
// TODO: The idea is to set the isAccepting flag as false or to delete assignment. One of the two choices
// NOTE: Need userId in both param and body and submissionId in params
const deleteSubmission=async(req,res)=>{
    try {

        if(req.params.userId!==req.body.userId) {
            return res.status(403).json("Unauthorised action");
        }
        
        const submission=await Submission.findById(req.params.submissionId);

        if(submission.submittedBy!=req.params.userId){
            return res.status(403).json("Un authorised action");
        }
        
        // const result=await removeSubmissionFromAssignment(submission.assignment,req.params.submissionId);
        // if(!result) throw new Error();

        await Submission.findByIdAndDelete(req.params.submissionId);
        res.status(200).json("Deleted Submission");

    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}
// ******************

module.exports={
    deleteSubmission,
    createSubmission,
    getAllSubmissionsForAssignment,
    getUsersEverySubmission,
    getUsersSubmissionForOneAssignment,
    getAll
}
