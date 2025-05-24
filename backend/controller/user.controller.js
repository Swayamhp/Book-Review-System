import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

   

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500);
    throw new Error('User already exists');
  }
};


//now login 
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar:user.avatar
    });
  } catch (err) {
    next(err);
  }
};

export const getuserData = async(req,res,next)=>{
  try{
    const id = req.params.id;
    const user = await User.findById(id);
    if(user){
      res.status(200).json(user);
    }

  }catch(error){
    next(error);
  }
}
//update


export const updateUserData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
