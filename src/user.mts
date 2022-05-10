const mongoose1 = require('mongoose')

// const userSchema = new mongoose1.Schema({
//     name: String,
//     email:{
//       type:String,
//       required: true
//     },
//     createdAt: Date,
//     updatedAt: Date,
//     password: String
//   })

const userSchema = 
  new mongoose1.Schema({
    username: String,
    email: String,
    password: String,
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: { 
      type: String, 
      unique: true },
    roles: [
      {
        type: mongoose1.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  });
module.exports = mongoose1.model("User", userSchema);