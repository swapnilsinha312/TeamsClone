const express= require('express');
const mongoose=require('mongoose');

const authRouter=require('./routes/AuthRoute');
const userRouter=require('./routes/UserRoute');

// const submissionRouter=require('./routes/submissionRoute');
// const categoriesRouter=require('./routes/categoriesRoute');

const app= express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/teamsClone")
.then(console.log("Connected to the database"))
.catch((error)=>console.log(error));

const PORT="8080";

app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
// app.use("/api/posts/",postRouter);
// app.use("/api/categories/",categoriesRouter);

app.listen(PORT,()=>{
    console.log("Server is running");
});
