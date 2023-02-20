const express= require("express");
const { connection } = require("./db");
const { postRouter } = require("./routes/Posts.route");
require("dotenv").config()
const {userRouter} = require("./routes/Users.route")
const {authenticate} = require("./middlewares/Auth.middalware")
const cors = require("cors")

const app = express();

app.use(cors())

app.use(express.json());







app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter);
app.use(authenticate)
app.use("/posts",postRouter);



app.listen(process.env.port,async()=>{
    try{
                await connection
                console.log({"msg":"Connected to DB"})
    }catch(err){
        console.log({"MSG":err.message})
    }

    console.log({"msg":`Server is Running on ${process.env.port}` })
})
