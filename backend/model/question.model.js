const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    //Nội dung
    Question: {
      type: String,
    },
    Answers:[{
      Answer:{
        type: String,
      },
      IsCorrect:{
        type:Boolean,
      }

    }],
    User_answer: [{
      type: String
    }],
    Subject: { type: mongoose.Schema.Types.ObjectId, ref: "subject" },

    isYesnoquestion:{
      type:Boolean,
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);
