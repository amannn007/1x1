const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchedulerSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  mentorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  areaOfInterest: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  mentorAssigned: {
    type: Boolean,
    default: false, // Indicates if the mentor was automatically assigned
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
});

module.exports = mongoose.model('Scheduler', SchedulerSchema);
