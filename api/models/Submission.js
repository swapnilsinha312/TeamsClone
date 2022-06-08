const mongoose= require('mongoose');

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

    assignment:{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'Assignment' 
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