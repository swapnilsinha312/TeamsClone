// *******************
// Create new Team
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
