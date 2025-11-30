// test-env.js - Test if .env file is being loaded correctly
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

console.log('🔍 Testing Environment Variables Loading\n');
console.log('=' .repeat(60));

// Check if .env file exists
const envPath = path.resolve(__dirname, '.env');
console.log('\n📁 Checking .env file location:');
console.log('   Path:', envPath);
console.log('   Exists:', fs.existsSync(envPath) ? '✅ Yes' : '❌ No');

if (!fs.existsSync(envPath)) {
  console.log('\n❌ ERROR: .env file not found!');
  console.log('   Please create a .env file in the backend folder');
  console.log('   Location:', envPath);
  process.exit(1);
}

// Load .env file
console.log('\n📥 Loading .env file...');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.log('❌ Error loading .env:', result.error.message);
  process.exit(1);
}

console.log('✅ .env file loaded successfully\n');

// Check required variables
console.log('📋 Environment Variables Status:\n');

const requiredVars = {
  'PORT': process.env.PORT,
  'NODE_ENV': process.env.NODE_ENV,
  'MONGODB_URI': process.env.MONGODB_URI,
  'JWT_SECRET': process.env.JWT_SECRET,
  'JWT_EXPIRE': process.env.JWT_EXPIRE,
  'CLIENT_URL': process.env.CLIENT_URL,
  'CLOUDINARY_URL': process.env.CLOUDINARY_URL
};

let allGood = true;

Object.entries(requiredVars).forEach(([key, value]) => {
  const status = value ? '✅' : '❌';
  const displayValue = value 
    ? (key.includes('SECRET') || key.includes('URI') || key.includes('URL') 
        ? `${value.substring(0, 20)}...` 
        : value)
    : 'NOT SET';
  
  console.log(`   ${status} ${key.padEnd(20)} = ${displayValue}`);
  
  if (!value) {
    allGood = false;
  }
});

console.log('\n' + '='.repeat(60));

if (allGood) {
  console.log('\n✅ All environment variables are set correctly!');
  console.log('   You can now start the server with: npm run dev\n');
} else {
  console.log('\n❌ Some environment variables are missing!');
  console.log('   Please check your .env file and add the missing variables.\n');
  process.exit(1);
}
