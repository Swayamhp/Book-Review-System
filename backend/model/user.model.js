import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar:{
    type:String,
    default:"https://i.pravatar.cc/150?img=12"
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
