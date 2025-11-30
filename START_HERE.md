# 🚀 Quick Start Guide for New Setup

## For Your Friend's Laptop

Follow these steps **in order**:

---

## Step 1: Install Dependencies

### Backend:
```bash
cd backend
npm install
```

### Frontend:
```bash
cd frontend
npm install
```

---

## Step 2: Setup Environment Variables

### Create `backend/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://admin:sarahx@cluster0.pn2v7uc.mongodb.net/resume-portfolio?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:8080
CLOUDINARY_URL=cloudinary://583998296991126:28bCyBGTzn1XNQ6xPNGgndf0HmM@dqcdmx9mt
```

**⚠️ IMPORTANT:** Copy the exact values from your original .env file!

---

## Step 3: Whitelist IP in MongoDB Atlas

This is **CRITICAL** - most "failed to fetch" errors are from this!

1. Go to https://cloud.mongodb.com
2. Login with your MongoDB account
3. Click on your cluster
4. Click "Network Access" in left sidebar
5. Click "Add IP Address"
6. Click "Allow Access from Anywhere" (0.0.0.0/0)
7. Click "Confirm"
8. **WAIT 2-3 MINUTES** for changes to apply

---

## Step 4: Start Backend Server

**Open Terminal 1:**
```bash
cd backend
npm run dev
```

**Wait for these messages:**
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected
✅ Cloudinary configured successfully
📡 Health check: http://localhost:5000/api/health
```

**If you see errors:**
- MongoDB error → Check Step 3 (IP whitelist)
- Port error → Change PORT in .env to 5001
- Module error → Run `npm install` again

**⚠️ Keep this terminal open!**

---

## Step 5: Start Frontend Server

**Open Terminal 2 (NEW terminal):**
```bash
cd frontend
npm run dev
```

**Wait for this message:**
```
➜  Local:   http://localhost:8080/
```

**⚠️ Keep this terminal open!**

---

## Step 6: Test the Setup

### Option A: Use the diagnostic script
```bash
# In project root folder
node check-setup.js
```

### Option B: Manual test
1. Open browser
2. Go to http://localhost:8080
3. Try to register a new account
4. If it works → ✅ Success!
5. If error → Check browser console (F12)

---

## Common Issues:

### Issue: "Failed to fetch"

**Cause:** Backend not running or wrong URL

**Solution:**
1. Check Terminal 1 - backend should be running
2. Test: Open http://localhost:5000/api/health in browser
3. Should see: `{"success":true,"message":"Server is running"}`

---

### Issue: "MongoNetworkError" or "Connection timeout"

**Cause:** IP not whitelisted in MongoDB Atlas

**Solution:**
1. Go to MongoDB Atlas → Network Access
2. Add IP: 0.0.0.0/0 (allow all)
3. **WAIT 2-3 MINUTES**
4. Restart backend server (Ctrl+C, then `npm run dev`)

---

### Issue: "EADDRINUSE" (Port already in use)

**Cause:** Port 5000 or 8080 already in use

**Solution:**

**Windows:**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

---

### Issue: "Cannot find module"

**Cause:** Dependencies not installed

**Solution:**
```bash
# In backend folder
cd backend
rm -rf node_modules package-lock.json
npm install

# In frontend folder
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Verification Checklist:

Before asking for help, verify:

- [ ] Backend terminal shows "Server running"
- [ ] Frontend terminal shows "Local: http://localhost:8080"
- [ ] http://localhost:5000/api/health returns success
- [ ] MongoDB IP is whitelisted (0.0.0.0/0)
- [ ] .env file exists in backend folder
- [ ] .env has correct MONGODB_URI
- [ ] Both terminals are still open and running
- [ ] No red errors in browser console (F12)

---

## Still Not Working?

1. **Take screenshots of:**
   - Backend terminal output
   - Frontend terminal output
   - Browser console (F12 → Console tab)
   - Browser network tab (F12 → Network tab)

2. **Check:**
   - Node.js version: `node -v` (should be 16+)
   - npm version: `npm -v` (should be 8+)
   - Operating system

3. **Read:** SETUP_TROUBLESHOOTING.md for detailed solutions

---

## Quick Commands Reference:

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check Node.js version
node -v

# Check npm version
npm -v

# Install dependencies
npm install

# Start backend
cd backend && npm run dev

# Start frontend (in new terminal)
cd frontend && npm run dev

# Run diagnostic
node check-setup.js
```

---

## Success! 🎉

If you can:
1. Open http://localhost:8080
2. See the landing page
3. Register a new account
4. Login successfully

Then everything is working! You're ready to use the app.

---

## Need Help?

Read: `SETUP_TROUBLESHOOTING.md` for detailed solutions to all common issues.
