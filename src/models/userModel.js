import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "This email address already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  picture: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
  status: {
    type: String,
    default: "Hey There!! I am using WhatsApp",
  },
  password: {
    type: String,
    required: [true, "Please provide your password."],
    minLength: [6, "Please make sure your password is at least 6 characters"],
    maxLength: [20, "Password must be less than 20 characters"],
  },
}, {
  collection: "users",
  timestamps: true,
});

userSchema.pre('save',async function(next){
  try{
    if(this.isNew){
      const salt = await bcrypt.genSalt(12);
      const hashedPassword =  await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  }catch(error){
    next(error);
  }
})
const UserModel =mongoose.models.UserModel || mongoose.model("UserModel", userSchema) //agar hai to use kar ra use nhi to usermodel name me useeschema use kar re

export default UserModel;
