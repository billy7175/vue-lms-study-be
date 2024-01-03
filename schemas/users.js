const mongoose = require('mongoose')
const { Schema } = mongoose;
const { ObjectId } = Schema
// const class = require('./classes')

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
    },
    classTest: {
      type: ObjectId,
      ref: 'Classes'
    }
  }
  // { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);