const router= require('express').Router();
const assignmentController = require('../controllers/AssignmentController');


//Base route /api/assignment

// NOTE: teamId needed in req param
router.get("/:teamId/get",assignmentController.getAssignments);

// NOTE: assignmentId needed in req param
router.get("/get/:assignmentId",assignmentController.getAssignment);

// NOTE: Need userId in both param and body, 
// team, assignmentName, problemStatement in body
router.post("/add/:userId",assignmentController.createAssignment);

// NOTE: needs userId in body and param and assignmentId in param
router.delete("/delete/:userId/:assignmentId",assignmentController.deleteAssignment);

// NOTE: Need userId in both param and body and assignmentId Id in param
router.put("/toggleAcceptingSubmissions/:userId/:assignmentId",assignmentController.toggleAcceptingSubmissions);

module.exports=router;