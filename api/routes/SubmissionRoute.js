const express= require('express');
const router= express.Router();
const Submission = require('../controllers/SubmissionController');

// NOTE: Need userId in both param and body and assignmentId in param
// submittedBy, assignment, link, comment body
router.post("/:userId/add/:assignmentId",Submission.createSubmission);

// For checking
router.get("/",Submission.getAll);

// NOTE: userId body and param, 
router.get("/:userId/submissions",Submission.getUsersEverySubmission);


// NOTE: userId body and param, assignmentID param
router.get("/:userId/assignment/:assignmentId",Submission.getAllSubmissionsForAssignment);


// NOTE: userId body and param, assignmentID param
router.get("/:userId/submissions/:assignmentId",Submission.getUsersSubmissionForOneAssignment);


// NOTE: userId and submissionId in param abd body
router.delete("/:userId/delete/:submissionId",Submission.deleteSubmission);


module.exports=router;