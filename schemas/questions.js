const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        date: {
            type: Date,
            trim: true,
            required: true,
        },
        title: {
            type: String,
            trim: true,
            required: true,
            // unique: true,
        },
        memo: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        questions: {
            type: Array,
            trim: true,
            required: true,
            unique: true,
        }
    }
);

module.exports = mongoose.model("Question", userSchema);