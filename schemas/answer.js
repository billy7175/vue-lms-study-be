const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const answerSchema = new Schema(
    {
        date: {
            type: String,
            trim: true,
            required: true
        },
        answers: {
            type: Array,
            required: true
        },
        user: {
            type: ObjectId,
            ref: 'User',
            required: true,
            validate: {
                validator: async function (userId) {
                    const existingCount = await mongoose.models.Answer.countDocuments({
                        date: this.date,
                        user: userId
                    });

                    return existingCount === 0;
                },
                message: props => `The combination of date '${props.value}' and user '${props.path}' must be unique.`
            }
        }
    }
);

module.exports = mongoose.model('Answer', answerSchema);