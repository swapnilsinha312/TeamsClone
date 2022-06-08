const express= require('express');
const { createTeam, getTeams, getTeam } = require('../controllers/TeamsController');
const router= express.Router();

// Base Route '/api/team'

// NOTE: Send userId in both param and in body
router.post("/:userId/add",createTeam);

// NOTE: userID param and body
router.get("/:userId/get",getTeams);

// NOTE: teamId needed in req param and user ID in body and param
router.get("/:userId/get/:teamId",getTeam);

module.exports=router;











// ************************
// Delete Submission
// NOTE: userId and submissionId in param abd body
// router.delete("/:userId/delete/:submissionId",);
// **************
