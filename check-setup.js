// Quick Setup Diagnostic Script
const http = require('http');

console.log('🔍 Checking Resume Portfolio App Setup...\n');
console.log('=' .repeat(50));

// Check backend
console.log('\n📡 Checking Backend (http://localhost:5000)...');
http.get('http://localhost:5000/api/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.success) {
        console.log('✅ Backend is running correctly!');
        console.log('   Response:', data);
      } else {
        console.log('⚠️  Backend responded but with error');
        console.log('   Response:', data);
      }
    } catch (e) {
      console.log('⚠️  Backend responded but invalid JSON');
      console.log('   Response:', data);
    }
  });
}).on('error', (err) => {
  console.log('❌ Backend is NOT running!');
  console.log('   Error:', err.message);
  console.log('\n   💡 Solution:');
  console.log('   1. Open terminal in "backend" folder');
  console.log('   2. Run: npm install');
  console.log('   3. Run: npm run dev');
  console.log('   4. Wait for "Server running" message');
});

// Check frontend
console.log('\n🌐 Checking Frontend (http://localhost:8080)...');
setTimeout(() => {
  http.get('http://localhost:8080', (res) => {
    console.log('✅ Frontend is running correctly!');
    console.log('   Status:', res.statusCode);
  }).on('error', (err) => {
    console.log('❌ Frontend is NOT running!');
    console.log('   Error:', err.message);
    console.log('\n   💡 Solution:');
    console.log('   1. Open terminal in "frontend" folder');
    console.log('   2. Run: npm install');
    console.log('   3. Run: npm run dev');
    console.log('   4. Wait for "ready in" message');
  });
}, 1000);

// Summary
setTimeout(() => {
  console.log('\n' + '='.repeat(50));
  console.log('\n📋 Next Steps:');
  console.log('   1. Make sure both servers are running');
  console.log('   2. Check MongoDB Atlas IP whitelist (0.0.0.0/0)');
  console.log('   3. Open http://localhost:8080 in browser');
  console.log('   4. Check browser console (F12) for errors');
  console.log('\n📖 For detailed help, see: SETUP_TROUBLESHOOTING.md\n');
}, 2000);
