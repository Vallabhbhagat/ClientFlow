const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamMember",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do"
  },
  dueDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
