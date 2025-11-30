// config/cloudinary.js - Cloudinary Configuration
const cloudinary = require('cloudinary').v2;

// Parse Cloudinary URL from environment variable
const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (!cloudinaryUrl) {
  console.error('CLOUDINARY_URL is not set in environment variables');
} else {
  // Extract credentials from URL
  const urlParts = cloudinaryUrl.replace('cloudinary://', '').split('@');
  const [apiKey, apiSecret] = urlParts[0].split(':');
  const cloudName = urlParts[1];

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  console.log('✅ Cloudinary configured successfully');
}

module.exports = cloudinary;
