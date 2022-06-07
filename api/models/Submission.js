const mongoose= require('mongoose');
const Schema= mongoose.Schema

    // ID
	// Submitted By
	// Link
	// isSubmitted
	// Comment (Optional)
	// CreatedAt

const submissionSchema=new mongoose.Schema({
    submittedBy:{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    link:{
        type:String,
        required:true,
        unique:true
    },
    // isSubmitted:{
    //     type:Boolean,
    //     required:false
    // },
    comment:{
        type:String,
        required:false
    },
},{timestamps:true}
);

module.exports=mongoose.model("Submission",submissionSchema);