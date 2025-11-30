// index.js - Main Express Server
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error);
  console.log('📁 Looking for .env at:', envPath);
  console.log('⚠️  Make sure .env file exists in backend folder');
} else {
  console.log('✅ Environment variables loaded successfully');
}

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT', 'CLIENT_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.log('⚠️  Please check your .env file');
  process.exit(1);
}

// Log loaded configuration (without sensitive data)
console.log('\n📋 Configuration:');
console.log('   PORT:', process.env.PORT);
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('   CLIENT_URL:', process.env.CLIENT_URL);
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('   CLOUDINARY_URL:', process.env.CLOUDINARY_URL ? '✅ Set' : '❌ Missing');
console.log('');

// Initialize Cloudinary
require('./config/cloudinary');

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
const corsOrigin = process.env.CLIENT_URL;
if (!corsOrigin) {
  console.warn('⚠️  CLIENT_URL not set in .env, using default: http://localhost:8080');
}

app.use(cors({
  origin: corsOrigin || 'http://localhost:8080',
  credentials: true
}));

console.log('🔐 CORS enabled for origin:', corsOrigin || 'http://localhost:8080');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resume'));
app.use('/api/portfolios', require('./routes/portfolio'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 5000,
      clientUrl: process.env.CLIENT_URL || 'not set',
      mongodbConnected: process.env.MONGODB_URI ? 'configured' : 'not configured',
      cloudinaryConfigured: process.env.CLOUDINARY_URL ? 'yes' : 'no'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  process.exit(1);
});