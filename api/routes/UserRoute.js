const router= require('express').Router();
const userController=require('../controllers/UserController');

// *************************************
// GET one user
router.get('/:id', userController.getUser);
// *************************************



// *****************************************
// UPDATE
// This needs the user ID to be sent in the req body
router.put("/:id",userController.putUser);
// *****************************************



// *****************************************
// Delete a user
// Needs change on deletion submissions and teams need to be changed
router.delete("/:id",userController.deleteUser);
// *****************************************



// ***************************************************
// Adding a submission to a user
// Also adding the present date to the activity log
router.put("/:userId/addSubmission/:submissionId",userController.addSubmission);
// ***********************************


module.exports=router;

