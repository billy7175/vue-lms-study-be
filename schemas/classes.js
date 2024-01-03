const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema(
    {
        label : {
            type: String,
            trim:true,
            required : true
        }
    }
)


module.exports = mongoose.model('Class', classSchema)