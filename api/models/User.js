const mongoose= require('mongoose');
// const Schema= mongoose.Schema

// 	ID
// 	Email
// 	Name
// 	Password
// 	Uploads (Maybe)
// 	Activity Log (Maybe)
// 	CreatedAt

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    // userSubmissions:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Submission'
    // }],
    // userTeams:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Team'
    // }],

    // Made the above two changes as all members will be in all teams for now
     

    // activityLog:[{
    //     type:Date
    // }]
},{timestamps:true}
);

module.exports=mongoose.model("User",userSchema);