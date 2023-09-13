const mongoose = require("mongoose");

const subjectchema = new mongoose.Schema({

  Name: {
    type: String,
    required: true,
  },

  Questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
      default: [],
    },
  ],
});

module.exports = mongoose.model("subject", subjectchema);
