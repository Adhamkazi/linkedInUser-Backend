const express = require("express")
const {PostModal} =require("../modals/Posts.modal");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
require("dotenv").config();



const postRouter = express.Router();


postRouter.get("/", async (req, res) => {
        
    const device = req.query.device;
   
     if (device) {
        try {
            let post = await PostModal.find({ device:device });
            res.send(post);
        } catch (err) {
            console.log(err);
        }
    }  else {
        try {
            const posts = await PostModal.find();
            res.send(posts)
        } catch (err) {
            res.send({ "msg": "Please Login", "error": err.message })
        }
            }
})


 postRouter.post("/create",async(req,res)=>{
        const {title,body,device,no_if_comments} = req.body
                try{
                        const post = new PostModal({title,body,device,no_if_comments})
                        await post.save();
                        res.send({"msg" : "Post has been added" })


                }catch(err){
                            res.send({"msg":"Something worng","error":err.message})
                }
 })



 postRouter.patch("/update/:id",async(req,res)=>{
   const id = req.params.id;
const payload =req.body
    const post = await PostModal.findOne({"_id":id});
    const userID_post =post.userID;
    const userID_req = req.body.userID
    try{
        if(userID_req!==userID_post){
                res.send({"msg":"You are not Authorized"})
        }else {
            await PostModal.findByIdAndUpdate({"_id":id},payload);
                res.send({ "msg": " post has been updated"})
        }
    }catch(err){
        res.send({"msg":"Something worng","msg":err.message})
    }
 })



 postRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const payload =req.body
        const post = await PostModal.findOne({"_id":id});
        const userID_post =post.userID;
        const userID_req = req.body.userID
        try{
            if(userID_req!==userID_post){
                    res.send({"msg":"You are not Authorized"})
            }else {
                await PostModal.findByIdAndDelete({"_id":id},payload);
                    res.send({ "msg": " Note has been deleted"})
            }
        }catch(err){
            res.send({"msg":"Something worng","msg":err.message})
        }
     })
    



    


 module.exports={
    postRouter
 }