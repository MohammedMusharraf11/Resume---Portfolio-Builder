# API Testing Guide

Use these requests to test your Resume Builder & E-Portfolio API.

## Base URL
```
http://localhost:5000/api
```

## 1. Health Check

```bash
GET http://localhost:5000/api/health
```

Expected Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-30T..."
}
```

---

## 2. Authentication Tests

### Register New User

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Expected Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePicture": ""
  }
}
```

### Login User

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User (Protected)

```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

### Update Profile (Protected)

```bash
PUT http://localhost:5000/api/auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "fullName": "John Updated Doe",
  "profilePicture": "https://example.com/profile.jpg"
}
```

---

## 3. Resume Tests

**Note**: All resume endpoints require authentication. Add this header to all requests:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Create Resume

```bash
POST http://localhost:5000/api/resumes
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Software Engineer Resume",
  "template": "modern",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "linkedin": "https://linkedin.com/in/johndoe",
    "location": "New York, NY",
    "professionalSummary": "Experienced software engineer with 5+ years in full-stack development."
  },
  "education": [
    {
      "degree": "Bachelor of Computer Science",
      "institution": "MIT",
      "year": "2020",
      "gpa": "3.8"
    }
  ],
  "experience": [
    {
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Corp",
      "duration": "2020 - Present",
      "responsibilities": [
        "Led team of 5 developers",
        "Built scalable REST APIs",
        "Improved system performance by 40%"
      ]
    }
  ],
  "skills": {
    "technical": ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    "soft": ["Leadership", "Communication", "Problem Solving"]
  },
  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "Built a full-stack e-commerce platform",
      "technologies": ["React", "Node.js", "MongoDB"],
      "link": "https://github.com/johndoe/ecommerce"
    }
  ],
  "achievements": [
    "Employee of the Year 2023",
    "Published 3 technical articles"
  ],
  "certifications": [
    "AWS Certified Developer",
    "MongoDB Certified Professional"
  ]
}
```

### Get All My Resumes

```bash
GET http://localhost:5000/api/resumes
Authorization: Bearer YOUR_TOKEN_HERE
```

### Get Single Resume

```bash
GET http://localhost:5000/api/resumes/RESUME_ID
Authorization: Bearer YOUR_TOKEN_HERE
```

### Update Resume

```bash
PUT http://localhost:5000/api/resumes/RESUME_ID
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Updated Resume Title",
  "template": "professional"
}
```

### Delete Resume

```bash
DELETE http://localhost:5000/api/resumes/RESUME_ID
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 4. Portfolio Tests

### Create/Update Portfolio (Protected)

```bash
POST http://localhost:5000/api/portfolios
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "aboutMe": {
    "bio": "I'm a passionate full-stack developer with expertise in MERN stack.",
    "tagline": "Building amazing web experiences",
    "profilePicture": "https://example.com/profile.jpg"
  },
  "skills": [
    {
      "name": "JavaScript",
      "level": 90,
      "category": "technical"
    },
    {
      "name": "React",
      "level": 85,
      "category": "technical"
    },
    {
      "name": "Leadership",
      "level": 80,
      "category": "soft"
    }
  ],
  "projects": [
    {
      "title": "Resume Builder App",
      "description": "A full-stack MERN application for building professional resumes",
      "image": "https://example.com/project1.jpg",
      "technologies": ["React", "Node.js", "MongoDB", "Express"],
      "githubLink": "https://github.com/johndoe/resume-builder",
      "liveLink": "https://resume-builder.com",
      "order": 1
    }
  ],
  "contact": {
    "email": "john@example.com",
    "phone": "+1234567890",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "website": "https://johndoe.com"
  },
  "isPublished": true
}
```

### Get My Portfolio (Protected)

```bash
GET http://localhost:5000/api/portfolios/me
Authorization: Bearer YOUR_TOKEN_HERE
```

### Get Portfolio by Slug (Public)

```bash
GET http://localhost:5000/api/portfolios/portfolio-12345678
```

Note: The slug is automatically generated when you create a portfolio. Check your portfolio response to get the slug.

### Toggle Publish Status (Protected)

```bash
PATCH http://localhost:5000/api/portfolios/publish
Authorization: Bearer YOUR_TOKEN_HERE
```

### Delete Portfolio (Protected)

```bash
DELETE http://localhost:5000/api/portfolios
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Testing Workflow

1. **Register a new user** → Save the token
2. **Login** → Verify token works
3. **Get current user** → Verify authentication
4. **Create a resume** → Save the resume ID
5. **Get all resumes** → Verify resume appears
6. **Update resume** → Verify changes
7. **Create portfolio** → Save the slug
8. **Get portfolio by slug** → Verify public access
9. **Toggle publish** → Test publish/unpublish
10. **Delete resume** → Verify deletion

---

## Using Postman

1. Create a new collection called "Resume Builder API"
2. Add an environment variable `baseUrl` = `http://localhost:5000/api`
3. Add an environment variable `token` = (paste your JWT token after login)
4. Use `{{baseUrl}}` and `{{token}}` in your requests

## Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create a new collection
3. Add requests from above
4. Use environment variables for token management

---

## Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```
