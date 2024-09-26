const express=require('express')
const cors=require('cors')
const app=express()
const cookieParser = require('cookie-parser');

const userRouter=require('./Routes/userRoute')

app.use(express.json())
app.use(cors(
    {
        credentials: true,
        origin: ['http://localhost:3000'],
        
      }
))
app.use(cookieParser());



app.use("/",userRouter)

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.listen(5000,()=>{
    console.log('server is running on port 5000');
})