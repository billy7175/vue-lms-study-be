const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    }
  }
  // { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);