# Upload API Testing Guide

## Backend Setup Complete ✅

The following files have been created:
- `backend/config/cloudinary.js` - Cloudinary configuration
- `backend/middleware/upload.js` - Multer file upload middleware
- `backend/controllers/uploadController.js` - Upload controllers
- `backend/routes/uploadRoutes.js` - Upload routes
- `backend/index.js` - Updated with upload routes

## API Endpoints

### 1. Upload Profile Picture
```
POST /api/upload/profile
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data
Body: image file (max 5MB)
```

### 2. Upload Project Image
```
POST /api/upload/project
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data
Body: image file (max 5MB)
```

### 3. Upload General Image
```
POST /api/upload/image
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data
Body: image file (max 5MB)
```

## Testing with cURL

### Step 1: Get Authentication Token
First, login to get your JWT token:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"your@email.com\",\"password\":\"yourpassword\"}"
```

Copy the `token` from the response.

### Step 2: Test Profile Picture Upload

```bash
curl -X POST http://localhost:5000/api/upload/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@/path/to/your/image.jpg"
```

**Windows PowerShell:**
```powershell
curl.exe -X POST http://localhost:5000/api/upload/profile -H "Authorization: Bearer YOUR_TOKEN_HERE" -F "image=@C:\path\to\image.jpg"
```

### Step 3: Test Project Image Upload

```bash
curl -X POST http://localhost:5000/api/upload/project \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@/path/to/your/project-image.jpg"
```

## Expected Response

### Success Response:
```json
{
  "success": true,
  "message": "Profile picture uploaded successfully",
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/resume-portfolio/profiles/abc123.jpg",
  "publicId": "resume-portfolio/profiles/abc123"
}
```

### Error Response:
```json
{
  "success": false,
  "message": "No file uploaded"
}
```

## Frontend Integration Complete ✅

The frontend has been updated with:
- Upload API service methods in `frontend/src/services/api.ts`
- Profile picture upload in Portfolio Editor
- Project image upload in Portfolio Editor
- Image preview functionality
- Loading states during upload
- Error handling with toast notifications

## How to Use in Frontend

1. **Profile Picture:**
   - Go to Portfolio Editor → About Me tab
   - Click "Upload Photo" button
   - Select an image (max 5MB)
   - Image is automatically uploaded to Cloudinary
   - Preview appears immediately

2. **Project Images:**
   - Go to Portfolio Editor → Projects tab
   - Add or edit a project
   - Click "Upload Image" button
   - Select an image (max 5MB)
   - Image is automatically uploaded to Cloudinary
   - Preview appears immediately
   - Or paste an image URL directly

## Image Transformations

### Profile Pictures:
- Resized to 500x500px
- Cropped to fill with face detection
- Auto quality optimization
- Auto format selection (WebP when supported)

### Project Images:
- Max dimensions: 1200x800px
- Maintains aspect ratio
- Auto quality optimization
- Auto format selection (WebP when supported)

## Troubleshooting

### "No file uploaded" error:
- Make sure you're using `-F` flag with curl (not `-d`)
- Check that the file path is correct
- Ensure the file exists

### "Only image files are allowed" error:
- Upload only image files (jpg, png, gif, webp, etc.)
- Check the file extension

### "Failed to upload image" error:
- Check Cloudinary credentials in `.env`
- Ensure CLOUDINARY_URL is correctly formatted
- Check server logs for detailed error

### Authentication errors:
- Make sure you're logged in
- Check that the token is valid and not expired
- Include "Bearer " prefix in Authorization header

## Notes

- All uploads require authentication
- Images are stored in Cloudinary folders:
  - Profile pictures: `resume-portfolio/profiles/`
  - Project images: `resume-portfolio/projects/`
- Maximum file size: 5MB
- Supported formats: All image formats (jpg, png, gif, webp, etc.)
- Images are automatically optimized for web delivery
