const express=require('express')
const { getdata,userSignup,loginUser,verifyUser,isLogout } = require('../Controllers/userController')
const {isLogin}=require('../middleware/auth')

const userRouter=express.Router()

userRouter.get("/users",isLogin,getdata)
userRouter.post("/usersignup",userSignup)
userRouter.post("/userlogin",loginUser)
userRouter.get("/me",verifyUser)
userRouter.get("/logout",isLogout)

module.exports=userRouter