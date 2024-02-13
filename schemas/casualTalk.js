const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const subCommentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  parentId: {
    type: ObjectId,
    ref: 'CasualTalk', // Reference to the main comment (CasualTalk)
    required: true
  },
  // Additional fields as needed
},{ timestamps: true });

const casualTalkSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  // subComments: [subCommentSchema]
  subComments: [
    {
      type: ObjectId,
      ref:'SubCasualTalk'
    }
  ]
}, { timestamps: true });

module.exports = {
  CasualTalk : mongoose.model('CasualTalk', casualTalkSchema),
  SubCasualTalk : mongoose.model('SubCasualTalk', subCommentSchema)
}