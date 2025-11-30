# Setup Troubleshooting Guide - "Failed to Fetch" Error

## Common Issue: Frontend can't connect to Backend

### Quick Checklist:

1. ✅ Backend server is running
2. ✅ Frontend dev server is running
3. ✅ Correct ports are being used
4. ✅ MongoDB connection is working
5. ✅ CORS is configured properly
6. ✅ Environment variables are set

---

## Step-by-Step Fix:

### 1. Check Backend is Running

**In backend folder:**
```bash
cd backend
npm install
npm run dev
```

**Expected output:**
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected
✅ Cloudinary configured successfully
📡 Health check: http://localhost:5000/api/health
```

**If you see errors:**
- MongoDB connection error → Check MongoDB URI and IP whitelist
- Port already in use → Change PORT in .env or kill the process
- Module not found → Run `npm install` again

### 2. Check Frontend is Running

**In frontend folder:**
```bash
cd frontend
npm install
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:8080/
➜  Network: use --host to expose
```

### 3. Test Backend Health Check

**Open browser or use curl:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-30T..."
}
```

**If this fails:**
- Backend is not running
- Wrong port (check backend/.env PORT)
- Firewall blocking the port

### 4. Check MongoDB Connection

**Common MongoDB Issues:**

#### Issue: "MongoNetworkError" or "Connection timeout"
**Solution:**
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add your friend's specific IP address
5. Wait 2-3 minutes for changes to apply

#### Issue: "Authentication failed"
**Solution:**
- Check username and password in MONGODB_URI
- Make sure there are no special characters that need encoding
- Verify database user exists in MongoDB Atlas

### 5. Check CORS Configuration

**In backend/index.js, verify:**
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

**If frontend runs on different port:**
- Update CLIENT_URL in backend/.env
- Restart backend server

### 6. Environment Variables Setup

**Backend (.env file in backend folder):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:8080
CLOUDINARY_URL=your_cloudinary_url
```

**Frontend (no .env needed, but check vite.config.ts):**
```typescript
export default defineConfig({
  server: {
    port: 8080,
  },
  // ...
})
```

---

## Common Errors and Solutions:

### Error: "Failed to fetch"

**Possible Causes:**
1. Backend not running
2. Wrong API URL
3. CORS issue
4. Network/Firewall blocking

**Solutions:**
```bash
# 1. Check if backend is running
curl http://localhost:5000/api/health

# 2. Check frontend can reach backend
# Open browser console and run:
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(console.log)

# 3. If CORS error, check backend CORS config
# 4. If network error, check firewall/antivirus
```

### Error: "MongoNetworkError"

**Solution:**
1. MongoDB Atlas → Network Access
2. Add IP: 0.0.0.0/0 (allow all)
3. Wait 2-3 minutes
4. Restart backend server

### Error: "EADDRINUSE" (Port already in use)

**Solution:**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env:
PORT=5001
```

### Error: "Cannot find module"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or on Windows:
rmdir /s node_modules
del package-lock.json
npm install
```

---

## Testing the Setup:

### Test 1: Backend Health Check
```bash
curl http://localhost:5000/api/health
```
✅ Should return: `{"success":true,"message":"Server is running"}`

### Test 2: Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@test.com","password":"test123"}'
```
✅ Should return: `{"success":true,"token":"..."}`

### Test 3: Frontend Connection
1. Open http://localhost:8080
2. Open browser console (F12)
3. Check for errors
4. Try to register/login

---

## Quick Fix Script

**Create a file `check-setup.js` in root folder:**
```javascript
const http = require('http');

console.log('🔍 Checking setup...\n');

// Check backend
http.get('http://localhost:5000/api/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('✅ Backend is running');
    console.log('Response:', data);
  });
}).on('error', (err) => {
  console.log('❌ Backend is NOT running');
  console.log('Error:', err.message);
  console.log('\nSolution: Run "npm run dev" in backend folder');
});

// Check frontend
http.get('http://localhost:8080', (res) => {
  console.log('✅ Frontend is running');
}).on('error', (err) => {
  console.log('❌ Frontend is NOT running');
  console.log('\nSolution: Run "npm run dev" in frontend folder');
});
```

**Run it:**
```bash
node check-setup.js
```

---

## Still Not Working?

### Debug Steps:

1. **Check browser console (F12):**
   - Look for red errors
   - Check Network tab for failed requests
   - Note the exact error message

2. **Check backend terminal:**
   - Look for error messages
   - Check if requests are being received
   - Note any MongoDB errors

3. **Check ports:**
   ```bash
   # Windows:
   netstat -ano | findstr :5000
   netstat -ano | findstr :8080
   
   # Mac/Linux:
   lsof -i :5000
   lsof -i :8080
   ```

4. **Test with Postman/Insomnia:**
   - Try API endpoints directly
   - Eliminates frontend issues

5. **Check firewall/antivirus:**
   - Temporarily disable to test
   - Add exceptions for Node.js

---

## Fresh Install Steps:

If nothing works, try fresh install:

```bash
# 1. Clone repo
git clone <repo-url>
cd resume-portfolio-app

# 2. Backend setup
cd backend
npm install
# Create .env file with correct values
npm run dev
# Wait for "Server running" message

# 3. In NEW terminal - Frontend setup
cd frontend
npm install
npm run dev
# Wait for "ready in" message

# 4. Open browser
# Go to http://localhost:8080
```

---

## Contact Info for Help:

If still having issues, provide:
1. Error message (exact text)
2. Browser console screenshot
3. Backend terminal output
4. Operating system
5. Node.js version (`node -v`)
6. npm version (`npm -v`)
