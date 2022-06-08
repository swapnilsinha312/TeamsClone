import Assignment from "../models/Assignment";
import Submission from "../models/Submission";


// *******************
// Get all Assignments of a team
export const getAssignments=async(req,res)=>{
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
// Get one Teams
// NOTE: teamId needed in req param
export const getAssignment=async(req,res)=>{
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
// NOTE: Need userId in both param and body and team Id
export const createAssignment=async(req,res)=>{
    try {

        if(req.params.userId!==req.body.userId) {
            return res.status(403).json("Unauthorised action");
        }

        const newAssignment=new Assignment({
            assignedBy:req.body.userId,
            team:req.body.teamId
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
// NOTE: Need userId in both param and body and team Id
export const stopAcceptingSubmissions=async(req,res)=>{
    try {

        if(req.params.userId!==req.body.userId) {
            return res.status(403).json("Unauthorised action");
        }
        
        const assignment=await Assignment.findById(req.param.assignmentId);
        if(assignment.assignedBy!==req.params.userId){
            return res.status(403).json("Unauthorised action");
        }
        
        Assignment.findOneAndUpdate(
                {_id:req.params.assignmentId}, 
                { isAccepting:false}
                );

        res.status(200).json("Stopped accepting");

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
export const deleteAssignment=async(req,res)=>{
    try 
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised acess");
        }

        const assignment= Assignment.findById(req.params.assignmentId);
        if(req.params.userId!==assignment.createdBy){
            return res.status(403).json("Unauthorised access");
        }
        
        Submission.deleteMany({assignment:assignment._id});
        Assignment.findByIdAndDelete(assignment._id);

        res.status(200).json("Deleted");
    } 
    catch (error) {
        res.status(500).json(error);
    }
}
// **********************












// *************************************************************

// No use due to change in database structure
// ******************
//  Non API function
export const removeSubmissionFromAssignment=async(assignmentId,submissionId)=>{
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
export const addSubmissionToAssignment=async(assignmentId,submissionId)=>{
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
