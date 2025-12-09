const express=require('express');
const app=express();
const port=8000;
const mongoose=require('mongoose');
require('dotenv').config();
const cors=require('cors');

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173', //Allow only from frontend
}))

//Mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{ 
    console.error("Error connecting to MongoDB",err);
})


app.use('/',(req,res)=>{
    res.send('Hello World!');
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});