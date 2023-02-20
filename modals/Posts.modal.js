const mongoose = require("mongoose");

mongoose.set('strictQuery', true)


const postSchema = mongoose.Schema ({
    title:String,
    body:String,
    device : String,
    no_if_comments :Number,
userID :String
})


const PostModal = mongoose.model("post",postSchema);


module.exports ={
    PostModal
}