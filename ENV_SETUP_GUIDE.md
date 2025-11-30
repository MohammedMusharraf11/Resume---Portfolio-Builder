# Environment Variables Setup Guide

## Problem: Backend not reading .env file

This guide ensures the backend properly reads all values from the .env file.

---

## Step 1: Verify .env File Location

The `.env` file **MUST** be in the `backend` folder:

```
resume-portfolio-app/
├── backend/
│   ├── .env          ← File must be here!
│   ├── index.js
│   ├── package.json
│   └── ...
├── frontend/
└── ...
```

---

## Step 2: Create/Update .env File

**In `backend/.env` file, add these exact lines:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://admin:sarahx@cluster0.pn2v7uc.mongodb.net/resume-portfolio?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:8080
CLOUDINARY_URL=cloudinary://583998296991126:28bCyBGTzn1XNQ6xPNGgndf0HmM@dqcdmx9mt
```

**⚠️ IMPORTANT:**
- No spaces around `=` sign
- No quotes around values
- No trailing spaces
- Save the file as `.env` (not `.env.txt`)

---

## Step 3: Test Environment Variables

**Before starting the server, test if .env is being read:**

```bash
cd backend
npm run test:env
```

**Expected output:**
```
✅ .env file loaded successfully

📋 Environment Variables Status:

   ✅ PORT                 = 5000
   ✅ NODE_ENV             = development
   ✅ MONGODB_URI          = mongodb+srv://admin...
   ✅ JWT_SECRET           = your_jwt_secret_key...
   ✅ JWT_EXPIRE           = 30d
   ✅ CLIENT_URL           = http://localhost:8080
   ✅ CLOUDINARY_URL       = cloudinary://583998...

✅ All environment variables are set correctly!
```

**If you see ❌ (red X):**
- The variable is missing or not set
- Check your .env file
- Make sure there are no typos
- Make sure file is named `.env` exactly

---

## Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected output:**
```
✅ Environment variables loaded successfully

📋 Configuration:
   PORT: 5000
   NODE_ENV: development
   CLIENT_URL: http://localhost:8080
   MONGODB_URI: ✅ Set
   JWT_SECRET: ✅ Set
   CLOUDINARY_URL: ✅ Set

🔐 CORS enabled for origin: http://localhost:8080
✅ MongoDB Connected
✅ Cloudinary configured successfully
🚀 Server running in development mode on port 5000
📡 Health check: http://localhost:5000/api/health
```

**If you see errors:**
- Check the error message
- Run `npm run test:env` first
- Make sure MongoDB IP is whitelisted

---

## Step 5: Verify Configuration

**Test the health endpoint:**

```bash
curl http://localhost:5000/api/health
```

**Or open in browser:**
```
http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-30T...",
  "environment": {
    "nodeEnv": "development",
    "port": "5000",
    "clientUrl": "http://localhost:8080",
    "mongodbConnected": "configured",
    "cloudinaryConfigured": "yes"
  }
}
```

**Check that:**
- ✅ `clientUrl` shows `http://localhost:8080` (not "not set")
- ✅ `mongodbConnected` shows "configured"
- ✅ `cloudinaryConfigured` shows "yes"

---

## Common Issues:

### Issue 1: .env file not found

**Symptoms:**
```
❌ Error loading .env file
📁 Looking for .env at: C:\...\backend\.env
⚠️  Make sure .env file exists in backend folder
```

**Solution:**
1. Make sure file is in `backend` folder
2. File must be named `.env` exactly (not `.env.txt`)
3. On Windows, enable "Show file extensions" to verify

**How to show file extensions on Windows:**
1. Open File Explorer
2. Click "View" tab
3. Check "File name extensions"
4. Verify file is `.env` not `.env.txt`

---

### Issue 2: CLIENT_URL not being read

**Symptoms:**
```
⚠️  CLIENT_URL not set in .env, using default: http://localhost:8080
```

**Solution:**
1. Open `backend/.env`
2. Make sure this line exists: `CLIENT_URL=http://localhost:8080`
3. No spaces around `=`
4. No quotes
5. Save file
6. Restart server

---

### Issue 3: CORS error in browser

**Symptoms:**
```
Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:8080' 
has been blocked by CORS policy
```

**Solution:**
1. Check backend terminal shows: `🔐 CORS enabled for origin: http://localhost:8080`
2. If it shows different URL, update CLIENT_URL in .env
3. Make sure frontend is running on port 8080
4. Restart backend server after changing .env

---

### Issue 4: Variables showing as "not set"

**Symptoms:**
```
❌ Missing required environment variables: CLIENT_URL, JWT_SECRET
```

**Solution:**
1. Open `.env` file in text editor
2. Check for typos in variable names
3. Make sure no extra spaces
4. Make sure file is saved
5. Run `npm run test:env` to verify

**Example of WRONG format:**
```env
CLIENT_URL = "http://localhost:8080"  ❌ (spaces and quotes)
CLIENT URL=http://localhost:8080      ❌ (space in name)
CLIENTURL=http://localhost:8080       ❌ (wrong name)
```

**Example of CORRECT format:**
```env
CLIENT_URL=http://localhost:8080      ✅
```

---

## Verification Checklist:

Before asking for help, verify:

- [ ] `.env` file exists in `backend` folder
- [ ] File is named `.env` exactly (not `.env.txt`)
- [ ] All required variables are in the file
- [ ] No spaces around `=` signs
- [ ] No quotes around values
- [ ] `npm run test:env` shows all ✅
- [ ] Backend terminal shows "Environment variables loaded successfully"
- [ ] Backend terminal shows correct CLIENT_URL
- [ ] Health check shows correct configuration

---

## Quick Commands:

```bash
# Test if .env is being read
cd backend
npm run test:env

# Start backend
npm run dev

# Check health endpoint
curl http://localhost:5000/api/health

# Or in browser:
# http://localhost:5000/api/health
```

---

## Still Having Issues?

1. **Delete and recreate .env file:**
   ```bash
   cd backend
   # Delete old .env
   rm .env  # or del .env on Windows
   
   # Create new .env
   # Copy from .env.example
   cp .env.example .env
   
   # Edit .env and add your values
   ```

2. **Check file encoding:**
   - Open .env in Notepad++ or VS Code
   - Make sure encoding is UTF-8
   - No BOM (Byte Order Mark)

3. **Try absolute path:**
   - The fix in index.js uses absolute path
   - Should work even if working directory is wrong

4. **Check Node.js version:**
   ```bash
   node -v
   # Should be 16.x or higher
   ```

---

## What Was Fixed:

1. ✅ Changed `server.js` to `index.js` in package.json
2. ✅ Added explicit path resolution for .env file
3. ✅ Added validation for required environment variables
4. ✅ Added detailed logging of loaded configuration
5. ✅ Added warning if CLIENT_URL is not set
6. ✅ Added environment info to health check endpoint
7. ✅ Created test script to verify .env loading
8. ✅ Created .env.example template

Now the backend will:
- ✅ Always load .env from correct location
- ✅ Show clear error if .env is missing
- ✅ Show which variables are loaded
- ✅ Validate all required variables exist
- ✅ Use CLIENT_URL from .env (no hardcoded fallback in CORS)
