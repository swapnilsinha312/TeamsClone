const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

// *******************
// Get all Assignments of a team
// NOTE: Team Id in param
const getAssignments=async(req,res)=>{
    try
    {
        const assignments= await Assignment.find({team:req.params.teamId});
        res.status(200).json(assignments);
    }
    catch
    {
        console.log(error);
        res.status(500).json(error);
    }
}
// *******************



// *******************
// Get one assignment
// NOTE: assignmentId needed in req param
const getAssignment=async(req,res)=>{
    try
    {
        const assignment= await Assignment.findById(req.params.assignmentId);
        res.status(200).json(assignment);
    }
    catch
    {
        console.log(error);
        res.status(500).json(error);
    }
}
// *******************



// ******************
// Create Assignment
// NOTE: Need userId in both param and body and team Id in param,
const createAssignment=async(req,res)=>{
    try {

        if(req.params.userId!==req.body.userId) {
            return res.status(403).json("Unauthorised action");
        }

        const newAssignment=new Assignment({
            assignedBy:req.body.userId,
            team:req.body.teamId,
            assignmentName:req.body.assignmentName,
            problemStatement:req.body.problemStatement
            // deadline:req.body.deadline
        });

        const registeredAssignment=await newAssignment.save();

        // NOTE: Redundant due to change in database structure
        // TODO: Add assignment to team
        // const result= await addAssignmentToTeam(req.body.userId,registeredAssignment._id);
        // if(!result) throw new Error();

        res.status(200).json(registeredAssignment);

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
// NOTE: Need userId in both param and body and assignmentId Id in param
const toggleAcceptingSubmissions=async(req,res)=>{
    try {

        if(req.params.userId!==req.body.userId) {
            return res.status(403).json("Unauthorised action");
        }
        
        const assignment=await Assignment.findById(req.params.assignmentId);
        if(!assignment) {
            throw new Error("No Assignment");
        }

        if(assignment.assignedBy!=req.params.userId){
            return res.status(403).json("Unauthorised action");
        }

        assignment.isAcceptingSubmissions=!assignment.isAcceptingSubmissions;
        assignment.save();

        res.status(200).json(`Accepting submissions = ${assignment.isAcceptingSubmissions}`);

    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}
// ******************



// **********************
// NOTE: Deletes the assignment and also the submissions pertaining to the assignment
// Will only allow the creater of the assignment to delete it

// NOTE: needs userId in body and param and assignmentId in param
const deleteAssignment=async(req,res)=>{
    try 
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised acess");
        }

        const assignment= await Assignment.findById(req.params.assignmentId);
        if(req.params.userId!=assignment.assignedBy){
            // console.log(req.params.userId+" "+assignment.assignedBy);
            // console.log(req.params.userId+" "+assignment._doc.assignedBy);
            return res.status(403).json("Unauthorised access");
        }
        
        await Submission.deleteMany({assignment:assignment._id});
        await Assignment.findByIdAndDelete(req.params.assignmentId);

        res.status(200).json("Deleted");
    } 
    catch (error) {
        res.status(500).json(error);
    }
}
// **********************



module.exports={
    deleteAssignment,
    createAssignment,
    getAssignment,
    getAssignments,
    toggleAcceptingSubmissions
    
}








// *************************************************************

// No use due to change in database structure
// ******************
//  Non API function
const removeSubmissionFromAssignment=async(assignmentId,submissionId)=>{
    try {
        
        Assignment.findByIdAndUpdate(
        { _id:assignmentId },
        { $pull: { submissions: { $elemMatch: { _id:submissionId } } } }
        );

        return true;
    }
     catch (error) {
        console.log(error);
        return false;
    }
}
// ******************



// ******************
// Non api function 
const addSubmissionToAssignment=async(assignmentId,submissionId)=>{
    try 
    {
        Assignment.findOneAndUpdate(
            { _id: assignmentId },
            { $push: { submissions: submissionId } },
            { upsert: true },
        );

        return true; 
    } 

    catch (error) {
        console.log(error);
        return false;
    }
}
// ******************
