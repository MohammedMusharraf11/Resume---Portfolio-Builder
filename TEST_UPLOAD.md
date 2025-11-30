# Quick Upload Test Commands

## Prerequisites
1. Backend server running on http://localhost:5000
2. You have a user account created
3. You have an image file ready to upload

## Step-by-Step Test

### 1. Login and Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"YOUR_EMAIL\",\"password\":\"YOUR_PASSWORD\"}"
```

**Copy the token from the response!**

### 2. Test Profile Picture Upload

**Linux/Mac:**
```bash
curl -X POST http://localhost:5000/api/upload/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@/path/to/your/image.jpg"
```

**Windows PowerShell:**
```powershell
curl.exe -X POST http://localhost:5000/api/upload/profile -H "Authorization: Bearer YOUR_TOKEN_HERE" -F "image=@C:\path\to\image.jpg"
```

### 3. Test Project Image Upload

**Linux/Mac:**
```bash
curl -X POST http://localhost:5000/api/upload/project \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@/path/to/your/image.jpg"
```

**Windows PowerShell:**
```powershell
curl.exe -X POST http://localhost:5000/api/upload/project -H "Authorization: Bearer YOUR_TOKEN_HERE" -F "image=@C:\path\to\image.jpg"
```

## Expected Success Response
```json
{
  "success": true,
  "message": "Profile picture uploaded successfully",
  "url": "https://res.cloudinary.com/dqcdmx9mt/image/upload/v1234567890/resume-portfolio/profiles/xyz.jpg",
  "publicId": "resume-portfolio/profiles/xyz"
}
```

## Common Errors

### "Invalid credentials"
- Check your email and password
- Make sure the user exists

### "No file uploaded"
- Use `-F` flag (not `-d`)
- Check file path is correct
- Make sure file exists

### "Only image files are allowed"
- Upload only image files (jpg, png, gif, etc.)

### "jwt malformed" or "No token provided"
- Include the full token in Authorization header
- Use format: `Bearer YOUR_TOKEN`
- Don't forget the space after "Bearer"

## Test in Frontend

1. Start frontend: `npm run dev` (in frontend folder)
2. Login to your account
3. Go to Portfolio Editor
4. Click "About Me" tab
5. Click "Upload Photo" button
6. Select an image
7. Watch it upload and preview!

## Verify Upload

After successful upload:
1. Copy the URL from the response
2. Paste it in your browser
3. You should see your uploaded image!

The image is now stored in Cloudinary and can be used in your portfolio.
