const Team = require("../models/Team");

// ******************
// Create new Team
// NOTE: Send userId in both param and in body
const createTeam=async(req,res)=>{
    try
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised Action");
        }

        const newTeam=new Team({
            teamName:req.body.teamName,
            description:req.body.description,
            createdBy:req.body.userId
        });

        const registeredTeam=await newTeam.save();
        res.status(200).json(registeredTeam);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
}
// *******************



// *******************
// Get all Teams
// NOTE: userID param and body

const getTeams=async(req,res)=>{
    try
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised Action");
        }

        const teams= await Team.find({});
        res.status(200).json(teams);
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
// NOTE: teamId needed in req param and user ID in body and param

const getTeam=async(req,res)=>{
    try
    {
        if(req.params.userId!==req.body.userId){
            return res.status(403).json("Unauthorised Action");
        }

        const team= await Team.findById(req.params.teamId);
        res.status(200).json(team);
    }
    catch
    {
        console.log(error);
        res.status(500).json(error);
    }
}
// *******************

module.exports={
    getTeam,
    getTeams,
    createTeam
}








// *********************************************************************************
// NOTE: Of no use; Change in db structure

// **************
// Add Assignment local function 
// NOTE: Non API call function 
const addAssignmentToTeam=async(teamId,assignmentId)=>{

    try {
     
     Team.findOneAndUpdate(
         { _id: teamId },
         { $push: { assignments: assignmentId } },
         { upsert: true },
     );
 
    return true;
    //  return res.status(200).json("Assignment Added");
    } 
 
    catch (error) {
        // return res.status(500).json(error);
        return false;
    }
 
 }
 // *********************
 
 const deleteTeam=async(req,res)=>{
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
}