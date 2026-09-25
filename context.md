# AI E-Commerce Project Context

## 1. Project overview
This repository is a lightweight AI e-commerce prototype built with a React frontend and a Node.js/Express backend. It is not yet a full production e-commerce platform, but it already includes a working demo flow for backend health checks, registration, login, and Cloudinary image upload.

The project is designed around a simple architecture:
- a customer-facing frontend for testing API interaction
- a backend API for auth and media upload logic
- environment-based configuration for external services
- a future-ready structure for ecommerce features such as products, payments, and admin flows

## 2. Repository structure

```text
AI_E-Commerce/
├── README.md
├── context.md
├── test-image.png
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
├── server/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── config/
│       └── config.env
└── .git/
```

## 3. Frontend architecture
The frontend is a Vite + React application in the client folder.

### Main frontend files
- client/package.json: Vite React app setup
- client/src/main.jsx: React root mount
- client/src/App.jsx: dashboard-like UI for backend interaction
- client/src/styles.css: all custom styling for the demo interface

### Frontend behavior
The React app, defined in App.jsx, provides these demo interactions:
- Check backend health by calling GET /
- Register a user by calling POST /api/register
- Login a user by calling POST /api/login
- Upload an image by calling POST /api/upload with multipart form data

The app runs against the backend at http://localhost:4000 and displays HTTP responses in console-style panels.

## 4. Backend architecture
The backend is an Express application in the server folder.

### Main backend files
- server/app.js: Express app configuration and API routes
- server/server.js: server bootstrapping and Cloudinary initialization
- server/config/config.env: environment configuration

### Middleware and setup
The app configures:
- CORS with FRONTEND_URL and DASHBOARD_URL
- cookie parsing
- JSON parsing
- URL-encoded request parsing
- `express-fileupload` for temporary file handling

### API routes currently implemented
- GET /: returns a basic health/status response
- POST /api/register: validates user data, checks duplicates, hashes password with bcrypt, stores user in memory
- POST /api/login: validates credentials, compares password hash, issues JWT, sets cookie
- POST /api/upload: accepts an image file, uploads to Cloudinary, deletes temp file, returns secure URL

### Important observation
The user data layer is intentionally in-memory. There is a `users` array inside server/app.js and no persistent database or ORM setup yet.

## 5. Technology stack
### Frontend
- React 18
- Vite 5
- JavaScript (ES modules)

### Backend
- Node.js
- Express 5
- dotenv
- CORS
- cookie-parser
- express-fileupload
- bcrypt
- jsonwebtoken
- Cloudinary SDK
- PostgreSQL driver (`pg`) is present, but not yet connected or wired into business logic

### External service configuration present
The project is prepared for integration with:
- Cloudinary for image uploads
- JWT-based auth
- Nodemailer for email delivery
- Stripe for payment processing
- Gemini API key for AI features

These are configured in server/config/config.env, but actual implementation flow is not complete in the codebase.

## 6. Data model and persistence
At the current stage, the application does not include:
- database connection logic
- schema definitions
- migrations
- models for users, products, carts, orders, or reviews
- repository/service layer for business operations

The only real persistence is the in-memory `users` array used for sign-up and sign-in testing.

## 7. Current project status
This codebase is best described as a working prototype / starter project rather than a completed ecommerce application.

### What works
- Backend starts and responds on the configured port
- Register route accepts and hashes user data
- Login route verifies credentials and returns JWT
- Image upload route sends file to Cloudinary
- Frontend can exercise these endpoints manually from the browser

### What is still missing
- product catalog and inventory management
- cart and checkout flow
- Stripe payment integration logic and webhooks
- order and payment persistence
- database-backed authentication and authorization rules
- admin dashboard functionality
- comprehensive validation and error handling
- tests and deployment setup

## 8. Environment configuration
The server environment file includes keys for:
- PORT
- FRONTEND_URL
- DASHBOARD_URL
- JWT_EXPIRES_IN
- COOKIE_EXPIRES_IN
- JWT_SECRET_KEY
- SMTP_SERVICE and Gmail SMTP values
- GEMINI_API_KEY
- CLOUDINARY_CLIENT_NAME, CLOUDINARY_CLIENT_API, CLOUDINARY_CLIENT_SECRET
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_FRONTEND_KEY

These values are intended for local development and future integrations, but some secret values are placeholders or redacted in the actual file.

## 9. Architectural interpretation
The codebase currently reflects a layered prototype architecture:
1. Frontend: React interface for testing business-critical flows
2. API layer: Express routes in server/app.js
3. External integrations: Cloudinary, Stripe, SMTP, Gemini configuration
4. Security layer: bcrypt password hashing and JWT authentication

The broader intended design appears to be a full-stack AI-powered ecommerce platform serving both a customer storefront and dashboard/admin interface, but the actual implementation has not progressed beyond the prototype stage.

## 10. Summary
This project is an early-stage AI e-commerce starter with a working Express API and a demo React frontend. It already demonstrates key foundations such as user registration, login, JWT cookies, and Cloudinary upload handling, but it does not yet include the full business logic, database layer, or real ecommerce features needed for a production-ready marketplace.
