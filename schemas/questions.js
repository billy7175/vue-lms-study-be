const mongoose = require('mongoose')
const { Schema } = mongoose;

const questionSchema = new Schema(
    {
        question : {
            type: String,
            trim:true,
            required:true
        },
        answer : {
            type: Object,
            required: true
        },
        options: {
            type: Array,
            required:true,
        },
        userSelectedAnswer : {
            type: Object,
        },
        isSubmitted: {
            type: Boolean
        },
        isReleased: {
            type: Boolean
        },
        scheduledDate : {
            type: Date
        },
        memo: {
            type: String,
            trim: true,
        },
    }
);

module.exports = mongoose.model("Question", questionSchema);