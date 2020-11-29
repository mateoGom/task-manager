
const bcrypt =require('bcryptjs')
const mongoose=require('mongoose')

const taskSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
        
    },

    description:{
        type: String,
        required:true,
        maxlength:200
    },
    completed:{
        type: Boolean,
        required:true,
        default:false
    }

})

const Task=mongoose.model("Task",taskSchema);


module.exports=Task;