const mongoose= require('mongoose');
const Schema= mongoose.Schema

//  ID
// 	Name
// 	Description
// 	MadeBy (Role:Admin) (Maybe)
// 	Members
// 	Assignments
// 	CreatedAt

const teamSchema=new mongoose.Schema({
    teamName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    
    // members:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: 'User' 
    // }],
    
    // Change in structure, all people will be part of all teams
    // Can't find a workaround at present
    

    assignments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Assignment' 
    }],

},{timestamp:true}
);

module.exports= mongoose.model('Team',teamSchema);