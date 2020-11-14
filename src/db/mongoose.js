const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name:{
      type:String,
      required:true,
      trim:true
  },
  
  email:{
      type: String,
      required:true,
      trim:true,
      lowercase:true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error('email is not valid');
          }
      }
  },
  password:{
      type: String,
      required:true,
      trim:true,
      minlength:7,
      validate(value){
          if(value.toLowerCase().includes('password')){
            throw new Error('Password can not contain "password"');
          }
      }
  },
  age:{
    type: Number,
    default:0,
    validate(value){
        if(value<0){
            throw new Error('age mnust be a positive number');
        }
    }
}
});

const me = new User({
  name: "pat",
  email: "pat@ef.com  ",
  password:"fregrgtgtrh"
  

});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error ", error);
  });
