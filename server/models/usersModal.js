const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//user configuration
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

//hash the password before saving

userSchema.pre('save',async function(next){
    const user  = this;
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
    next();
})

const User = mongoose.model('Users',userSchema)

module.exports = User;