const mongoose = require("mongoose");

const testschema = mongoose.Schema(
  {
    //Nội dung
    Mark: {
      type: Number,
    },
    //Tags
    User: 
      {type: mongoose.Schema.Types.ObjectId,
      ref: "user",}
    ,
    //Comments
    Questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("test", testschema);
