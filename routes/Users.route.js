const express = require("express");
const { UserModal } = require("../modals/Users.modal");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
var jwt = require('jsonwebtoken');
require("dotenv").config();


userRouter.get("/", async (req, res) => {
  
  res.send("All Users");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, pass, age, city } = req.body;
  const alreadyUser = await UserModal.find({  email });
  try {
    if(alreadyUser.length==0){
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                console.log({"msg":err.message});
            }else {
                const user = new UserModal({ name, email, gender, pass:hash, age, city });
                await user.save();
                res.status(202).send({ msg: "New User has been Regsitered" });
            }
    })
    }else {
        console.log("User already exist " )
    res.send({"msg":err.message});
    }
   
   
  } catch (err) {
    res.send({ msg: "User Already exist Please login ", "error": err.message });
  }
});




userRouter.post("/login", async (req, res) => {
    const { email, pass } = (req.body);
    try {
        const user = await UserModal.find({ email });
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, process.env.key)
                    res.send({ "MSG": "Logged In", "token": token })
                } else {
                    res.send({ "msg": "worng credentials" })
                }
            });

        } else {
            res.send({ "msg": "worng credentials" })
        }
    } catch (e) {
        res.send({ msg: "Something went worng", "err":e.message})
    }
})

module.exports = {
  userRouter,
};
