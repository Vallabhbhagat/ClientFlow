const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do"
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  estimatedHours: {
    type: Number,
    default: 0
  },
  actualHours: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
