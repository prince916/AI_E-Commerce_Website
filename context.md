# AI E-Commerce Project Context

## 1. Project Overview
This repository is a backend-focused e-commerce web application project named "AI_E-Commerce_Website". At the current stage, the codebase is a minimal backend bootstrap rather than a complete product implementation.

The project appears to be designed for:
- user authentication and authorization
- product and order management
- payment processing with Stripe
- email notifications
- cloud image uploads via Cloudinary
- dashboard and frontend integration

## 2. Repository Structure

```text
AI_E-Commerce/
├── README.md
├── server/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── config/
│       └── config.env
└── .git/
```

## 3. Tech Stack
The server uses the following main technologies:

- Runtime: Node.js
- Framework: Express.js
- Language: JavaScript (ES modules via `"type": "module"`)
- Database client: PostgreSQL driver (`pg`)
- Authentication: JWT + bcrypt
- File uploads: `express-fileupload`
- Email: Nodemailer
- Payments: Stripe
- Media storage: Cloudinary
- Config: dotenv
- CORS: cors
- Cookies: cookie-parser

## 4. Package Dependencies
From `server/package.json`:

```json
{
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cloudinary": "^2.10.0",
    "cookie-parser": "^4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-fileupload": "^1.5.2",
    "jsonwebtoken": "^9.0.3",
    "nodemailer": "^9.0.1",
    "pg": "^8.22.0",
    "stripe": "^22.3.0"
  }
}
```

## 5. App Bootstrap and Middleware
The file [server/app.js](server/app.js) creates the Express app and applies the core middleware:

- CORS configuration with allowed origins from `FRONTEND_URL` and `DASHBOARD_URL`
- Cookie parsing
- JSON body parsing
- URL-encoded body parsing
- Temporary file upload middleware using `express-fileupload`

Important code behavior:

```js
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
```

This indicates the backend expects both a frontend site and a dashboard/admin client to connect to it.

## 6. Server Startup
The file [server/server.js](server/server.js) starts the HTTP server and configures Cloudinary:

```js
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
```

This confirms the backend is currently a bootstrapped server only; API routes, database models, controllers, and business logic are not present yet.

## 7. Environment Configuration
The environment file [server/config/config.env](server/config/config.env) contains runtime values such as:

- server port: 4000
- frontend/dashboard URLs
- JWT settings
- SMTP configuration for Gmail
- Gemini API key
- Cloudinary credentials
- Stripe keys and webhook secret

This strongly suggests the project is intended to support:
- AI-based features (Gemini API)
- payment flows and webhooks
- email delivery
- media uploads
- secure JWT auth

## 8. Current Codebase Status
As of this review, the repository is still in an early scaffolding stage. It contains:

- basic Express app setup
- environment variables
- Cloudinary initialization
- package dependencies for a full-stack e-commerce backend

Missing from the current codebase:
- route definitions
- controller files
- model/database layer
- database connection logic
- auth routes
- product/order/payment endpoints
- frontend web app
- tests

## 9. Architectural Interpretation
The architecture appears to be designed as a Node/Express REST API that serves both:

1. a customer-facing frontend
2. an admin/dashboard frontend

Key integration points include:
- frontend URLs in CORS
- JWT-based authentication
- Cloudinary for assets
- Stripe for checkout/payment events
- SMTP for notifications
- PostgreSQL for persistent data storage

## 10. Developer Notes
This project likely started as a backend foundation for an AI-powered e-commerce site and will need additional modules such as:

- API versioning and route structure
- database schema and queries
- models for users, products, orders, reviews, carts, etc.
- service layer for Stripe, email, and Cloudinary
- middleware for auth, error handling, validation
- test coverage and deployment configuration

## 11. Summary
The codebase is a backend starter for an AI-enabled e-commerce platform with Express, JWT, PostgreSQL, Stripe, Cloudinary, and email integrations. The foundation is in place, but the actual business application logic still needs to be implemented.
