import Assignment from "../models/Assignment";
import Submission from "../models/Submission";

// ******************
// Create Assignment
// NOTE: Need userId in both param and body and team Id
export const createSubmission=async(req,res)=>{
    try {

        if(req.params.userId!==req.body.userId) {
            return res.status(403).json("Unauthorised action");
        }

        const assignment= await Assignment.findById(req.body.assignmentId);
        if(!assignment.isAccepting) {
            return res.status(401).json("Stopped Accepting");
        }

        const newSubmission=new Submission({
            submittedBy:req.body.userId,
            assignment:req.body.assignmentId,
            link:req.body.link,
        });

        if(req.body.comment){
            newSubmission.comment=req.body.comment;
        }

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
// NOTE: Need userId in both param and body and assignment Id in params
export const deleteSubmission=async(req,res)=>{
    try {

        if(req.params.userId!==req.body.userId) {
            return res.status(403).json("Unauthorised action");
        }
        
        const submission=await Submission.findById(req.param.submissionId);

        if(submission.submittedBy!==req.params.userId || submission.assignment!==req.params.assignmentId){
            return res.status(403).json("Unauthorised action");
        }
        
        // const result=await removeSubmissionFromAssignment(submission.assignment,req.params.submissionId);
        // if(!result) throw new Error();

        Submission.findByIdAndDelete(req.params.submissionId);
        res.status(200).json("Deleted Submission");

    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}
// ******************
