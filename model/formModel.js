const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  titleDescription: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['text', 'select'],
        required: true,
      },
      value: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      selectedOption: {
        type: String,
        default: null,
      },
    },
  ],
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
