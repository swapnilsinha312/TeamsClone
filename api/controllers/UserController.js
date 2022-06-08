import Submission from '../models/Submission';
import User from '../models/User';
const bcrypt= require('bcrypt');

// ******************
// Create user
export const createUser=async(req,res)=>{
    try {

        console.log("signup");

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });

        const registeredUser=await newUser.save();
        res.status(200).json(registeredUser);

    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}
// ******************

// ******************
// Login User
export const userLogin=async(req,res)=>{
    try {

        console.log("login");

        const user=await User.findOne({email:req.body.email});
        !user && res.send(400).json("Invalid Credentials");

        const isValid=await bcrypt.compare(req.body.password,user.password);
        !isValid && res.send(400).json("Invalid Credentials");

        const { password, ...others }= user._doc;
        res.status(200).json(others);
    } 

    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
// ******************

// ******************
// Delete User
export const deleteUser = async(req,res)=>{

    if(req.body.userId===req.params.id){
        
        try{
            const user=User.findById(req.params.id);
            try {
                await Post.deleteMany({email:user.email});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Deleted");
            } 
            catch (error) {
                res.status(500).json(err);
            }
        }
        catch{
            res.status(404).json("No such user");
        }
    }
    else{
        res.status(401).json("Others account not accesible");
    }
}
// ******************


// ******************
// Get user
export const getUser=async(req,res)=>{
    try {
        const user= await User.findById(req.params.id);
        const {password,...others}=user._doc;
        res.status(200).json(others);
    } 
    catch (error) {
        res.status(500).json(error);
    }
}
// ********



// **************
// Put user 
// NOTE: userId in both param and body
export const putUser=async(req,res)=>{

    if(req.body.userId===req.params.userId){
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password= await bcrypt.hash(req.body.password,salt);
        }

        try {
            const updatedUser= await User.findByIdAndUpdate(req.params.userId,{
                $set:req.body,
            },{new:true});
            res.status(200).json(updatedUser);
        } 
        catch (error) {
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("Others account not accesible");
    }
}
// *********************


// *********************
// Add submission to user
export const addSubmission=async (req,res)=>{
    try{
        const submission=await Submission.findById(req.params.submissionId);
        if(submission.submittedBy==req.params.userId)
        {
            // const user=User.findById(req.params.userId);
            // user.submissions.push(req.params.submissionId);
            // user.save();

            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { submissions: req.params.submissionId } },
                { upsert: true },
            );
            
            return res.status(200).json(updatedUser);
        }
        else{
            res.status(403).json("You are not authorized");
        }
    }
    catch{
        return res.status(400).json("Error");
    }
}
// *********************