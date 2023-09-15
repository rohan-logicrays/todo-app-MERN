const User = require("../models/usersModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const newUser = new User(req.body);
    
    newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({userId:user._id},'your-secret-key',{ expiresIn: '1h' })
    res.status(200).json({ token: token,userId:user._id});
  } catch (error) {
    res.status(500).json({message: 'Internal Server Error'});
  }
};

exports.profile = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return user information (excluding the password)
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };
  
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


exports.updateProfile = async (req,res) => {
    try {
        const userId = req.user.userId;
        const {username, email} = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message:'User not found'});
        }
        if(username)user.username = username;
        if(email)user.email = email;

        await user.save();

        const userData = {
            _id:user._id,
            username:user.username,
            email:user.email
        }
        res.json(userData);

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.deleteProfile = async (req, res) => {
    try {
      // Get the user ID from the decoded token
      const userId = req.user.userId;
  
      // Find the user by ID and delete the user
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(204).json({message:'Profile deleted successfully'}); // Respond with a 204 No Content status on success
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }