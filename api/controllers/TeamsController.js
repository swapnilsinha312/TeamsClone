import Team from "../models/Team";


// ******************
// Create new Team
// NOTE: Send userId in both param and in body
export const createTeam=async(req,res)=>{
    try
    {
        // 	Name
        // 	Description
        // 	MadeBy (Role:Admin) (Maybe)
        const newTeam=new Team({
            teamName:req.body.teamName,
            description:req.body.description,
            createdBy:req.body.userId
        });

        const registeredTeam=await newTeam.save();
        res.status(200).json(registeredTeam);
    }
    catch
    {
        console.log(error);
        res.status(500).json(error);
    }
}
// *******************



// *******************
// Get all Teams
export const getTeams=async(req,res)=>{
    try
    {
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
// NOTE: teamId needed in req param
export const getTeam=async(req,res)=>{
    try
    {
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










// *********************************************************************************
// NOTE: Of no use; Change in db structure

// **************
// Add Assignment local function 
// NOTE: Non API call function 
export const addAssignmentToTeam=async(teamId,assignmentId)=>{

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
 