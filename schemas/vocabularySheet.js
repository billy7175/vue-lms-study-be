const mongoose = require('mongoose')
const { Schema } = mongoose;
const { ObjectId } = Schema

const vocabularySheetSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    data: {
      type: Array,
    },
    register : {
        type: ObjectId,
        ref: 'Users'
    }
  }
);

module.exports = mongoose.model("VocabularySheet", vocabularySheetSchema);