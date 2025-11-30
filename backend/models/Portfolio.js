// models/Portfolio.js - Portfolio Model
const mongoose = require('mongoose');

const portfolioProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  technologies: [{ type: String }],
  githubLink: { type: String },
  liveLink: { type: String },
  order: { type: Number, default: 0 }
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, min: 0, max: 100, default: 50 },
  category: { type: String, enum: ['technical', 'soft', 'other'], default: 'technical' }
});

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  aboutMe: {
    bio: { type: String },
    tagline: { type: String },
    profilePicture: { type: String }
  },
  skills: [skillSchema],
  projects: [portfolioProjectSchema],
  contact: {
    email: { type: String },
    phone: { type: String },
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    website: { type: String }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate slug before saving
portfolioSchema.pre('save', async function() {
  if (!this.slug && this.user) {
    this.slug = `portfolio-${this.user.toString().slice(-8)}`;
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
