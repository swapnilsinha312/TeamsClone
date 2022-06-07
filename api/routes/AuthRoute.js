const router= require('express').Router();
const userController= require('../controllers/UserController');

router.post("/signUp",userController.createUser);

router.post("/login",userController.userLogin);

module.exports=router;