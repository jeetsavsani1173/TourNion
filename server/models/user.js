import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  id: {
    type: String,
  },
});

userSchema.pre('save',async function(){
  let salt = await bcrypt.genSalt(15);
  if(this.password !== undefined)
      this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword = async function(password){
  if(this.password === undefined) return false;
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWTToken = async function(){
  let secretKey = process.env.JWT_SECRET_KEY;
  let token = jwt.sign({email:this.email,id: this._id,},secretKey,{ expiresIn: '24h' });
  return token;
}

const userModel = mongoose.model('User',userSchema);

export default userModel;
