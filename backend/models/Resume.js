// models/Resume.js - Resume Model
const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true },
  gpa: { type: String }
});

const experienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  responsibilities: [{ type: String }]
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  link: { type: String }
});

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a resume title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  template: {
    type: String,
    enum: ['modern', 'classic', 'minimal', 'creative', 'professional'],
    default: 'modern'
  },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    linkedin: { type: String },
    location: { type: String },
    professionalSummary: { type: String }
  },
  education: [educationSchema],
  experience: [experienceSchema],
  skills: {
    technical: [{ type: String }],
    soft: [{ type: String }]
  },
  projects: [projectSchema],
  achievements: [{ type: String }],
  certifications: [{ type: String }],
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
