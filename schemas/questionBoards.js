const mongoose = require('mongoose')
const { Schema } = mongoose;

const questionBoardSchema = new Schema(
    {
        title : {
            type: String,
            required: true
        } ,
        description : {
            type: String,
            required: true
        },
        date: {
            type: String,
            validate: {
                validator: async function (value) {
                    console.log('Date Prop Validator', value) // 2024-01-09T02:22:33.484Z
                    console.log('Date Prop Validator', value.slice(0, 10)) // 2024-01-09
                    // Assuming date is in the format "YYYY-MM-DDTHH:mm:ss"
                    const existingDocument = await this.constructor.findOne({ date: { $regex: new RegExp(`^${value.slice(0, 10)}`) } });
                    return !existingDocument;
                },
                message: 'Duplicate date found in the database.'
            }
        },
        rate: {
            type: Number,
        },
        status: {
            type: String,
        }
    }
);

module.exports = mongoose.model("QuestionBoard", questionBoardSchema);