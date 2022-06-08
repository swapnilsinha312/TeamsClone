const mongoose= require('mongoose');
// const Schema= mongoose.Schema

    // ID
    // From
    // Submissions
    // AcceptingSubmissions
    // CreatedAt

const assignmentSchema=new mongoose.Schema({

    assignedBy:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    team:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Team' 
    },
    isAcceptingSubmissions:{
        type:Boolean,
        default:true
    },
    // NOTE: Storing list of submissions here is of no use, will only cause redundancy issues
    
    // submissions:[
    //     { 
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: 'Submission' 
    // }],

    // submissionDeadline:{
    //     type:Date,
    //     required:true
    // },
},{timestamps:true}
);

module.exports=mongoose.model("Assignment",assignmentSchema);