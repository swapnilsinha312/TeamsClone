const express= require('express');
const mongoose=require('mongoose');

const authRouter=require('./routes/AuthRoute');
const userRouter=require('./routes/UserRoute');
const teamRouter=require('./routes/TeamRoute');
const assignmentRouter=require('./routes/AssignmentRoute');
const submissionRouter=require('./routes/SubmissionRoute');

const app= express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/teamsClone")
.then(console.log("Connected to the database"))
.catch((error)=>console.log(error));


const PORT= process.env.PORT || 8080;


app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/team",teamRouter);
app.use("/api/assignment",assignmentRouter);
app.use("/api/submission",submissionRouter);

app.listen(PORT,()=>{
    console.log("Server is running");
});
