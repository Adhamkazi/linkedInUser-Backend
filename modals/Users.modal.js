const mongoose = require("mongoose");

mongoose.set('strictQuery', true)


const userSchema = mongoose.Schema ({
    name:String,
    email:String,
    gender : String,
    pass : String,
    age:Number,
    city:String

})


const UserModal = mongoose.model("user",userSchema);


module.exports ={
    UserModal
}