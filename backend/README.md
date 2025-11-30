# Resume Builder & E-Portfolio - Backend API

Complete backend API for the Resume Builder & E-Portfolio application built with Node.js, Express, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Resume Management**: Create, read, update, delete resumes with multiple templates
- **Portfolio Management**: Build and publish personal portfolios with custom slugs
- **Secure Routes**: Protected endpoints with JWT middleware
- **MongoDB Atlas**: Cloud database integration
- **Error Handling**: Comprehensive error handling middleware
- **Input Validation**: Express-validator for request validation

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── resumeController.js   # Resume CRUD operations
│   └── portfolioController.js # Portfolio CRUD operations
├── middleware/
│   ├── auth.js               # JWT authentication middleware
│   └── errorHandler.js       # Global error handler
├── models/
│   ├── User.js               # User schema
│   ├── Resume.js             # Resume schema
│   └── Portfolio.js          # Portfolio schema
├── routes/
│   ├── auth.js               # Auth routes
│   ├── resume.js             # Resume routes
│   └── portfolio.js          # Portfolio routes
├── utils/
│   └── pdfGenerator.js       # PDF generation utility
├── .env                      # Environment variables
├── .gitignore
├── index.js                  # Main server file
└── package.json
```

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Your `.env` file is already configured with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://admin:sarahx@cluster0.pn2v7uc.mongodb.net/resume-portfolio?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

**⚠️ Important**: Change `JWT_SECRET` to a strong random string in production!

### 3. Start the Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |
| PUT | `/api/auth/profile` | Private | Update user profile |

### Resume Routes (`/api/resumes`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/resumes` | Private | Create new resume |
| GET | `/api/resumes` | Private | Get all user's resumes |
| GET | `/api/resumes/:id` | Private | Get single resume |
| PUT | `/api/resumes/:id` | Private | Update resume |
| DELETE | `/api/resumes/:id` | Private | Delete resume |

### Portfolio Routes (`/api/portfolios`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/portfolios` | Private | Create/update portfolio |
| GET | `/api/portfolios/me` | Private | Get my portfolio |
| GET | `/api/portfolios/:slug` | Public | Get portfolio by slug |
| DELETE | `/api/portfolios` | Private | Delete portfolio |
| PATCH | `/api/portfolios/publish` | Private | Toggle publish status |

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Example API Requests

### Register User

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Resume

```bash
POST http://localhost:5000/api/resumes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Software Engineer Resume",
  "template": "modern",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "New York, NY",
    "professionalSummary": "Experienced software engineer..."
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
      "jobTitle": "Senior Developer",
      "company": "Tech Corp",
      "duration": "2020 - Present",
      "responsibilities": ["Led team of 5 developers", "Built scalable APIs"]
    }
  ],
  "skills": {
    "technical": ["JavaScript", "React", "Node.js", "MongoDB"],
    "soft": ["Leadership", "Communication", "Problem Solving"]
  }
}
```

## 🧪 Testing

Test the API health:

```bash
GET http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-30T..."
}
```

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- Protected routes with middleware
- Input validation with express-validator
- MongoDB injection prevention
- CORS configuration
- Environment variable protection

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing
- **express-validator**: Input validation

## 🚀 Next Steps

1. Test all endpoints with Postman or Thunder Client
2. Integrate with frontend React application
3. Implement PDF generation in `utils/pdfGenerator.js`
4. Add file upload for profile pictures and project images
5. Implement email verification
6. Add password reset functionality
7. Set up rate limiting for API endpoints
8. Add API documentation with Swagger

## 📄 License

MIT
