import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    googleID:String,
    profilePic:String,
});
const user=mongoose.model("User",userSchema);
export default user;