const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "Developer"
  }
}, { timestamps: true });

module.exports = mongoose.model("TeamMember", teamMemberSchema);
