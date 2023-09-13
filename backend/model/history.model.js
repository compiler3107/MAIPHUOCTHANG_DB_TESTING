const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    Tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "test" }],
    User: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("histoty", historySchema);
