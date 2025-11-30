// test-upload.js - Test script for upload API
const fs = require('fs');
const path = require('path');

// Create a simple test image (1x1 pixel PNG)
const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const testImageBuffer = Buffer.from(testImageBase64, 'base64');

// Save test image
const testImagePath = path.join(__dirname, 'test-image.png');
fs.writeFileSync(testImagePath, testImageBuffer);

console.log('✅ Test image created at:', testImagePath);
console.log('\n📝 Test the upload API with curl:');
console.log('\n1. First, login to get a token:');
console.log('curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\\"email\\":\\"your@email.com\\",\\"password\\":\\"yourpassword\\"}"');
console.log('\n2. Then upload the test image (replace YOUR_TOKEN with the token from step 1):');
console.log(`curl -X POST http://localhost:5000/api/upload/profile -H "Authorization: Bearer YOUR_TOKEN" -F "image=@${testImagePath}"`);
console.log('\n3. Or upload a project image:');
console.log(`curl -X POST http://localhost:5000/api/upload/project -H "Authorization: Bearer YOUR_TOKEN" -F "image=@${testImagePath}"`);
console.log('\n4. Or use your own image file:');
console.log('curl -X POST http://localhost:5000/api/upload/profile -H "Authorization: Bearer YOUR_TOKEN" -F "image=@/path/to/your/image.jpg"');
