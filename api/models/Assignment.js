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
    submissions:[
        { 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Submission' 
    }],
    submissionDeadline:{
        type:Date,
        required:true
    },
},{timestamps:true}
);

module.exports=mongoose.model("Assignment",assignmentSchema);