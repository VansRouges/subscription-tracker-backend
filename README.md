# 📦 Subscription Tracker API

A Node.js backend API for managing user subscriptions, authentication, email notifications, and workflow tracking. Built with **Express**, **MongoDB**, and modular controller-based architecture.

---

## 🚀 Features

- User Authentication (JWT-based)
- Subscription Management
- Email Notifications (via Nodemailer)
- Workflow Tracking using `@upstash/workflow`
- Role-based Middleware
- Secure and Modular API Architecture
- Environment-based Config Support
- Mongoose for MongoDB ODM
- ArcJet Integration for inspection and security
- ESLint for code linting
- Email Templates for consistent communication

---

## 📁 Project Structure

```
subscription-tracker/
├── config/               # Configuration files (e.g., Arcjet, nodemailer, env)
├── controllers/          # Route controllers (auth, subscription, user, workflow)
├── database/             # MongoDB setup
├── middlewares/          # Custom Express middleware
├── models/               # Mongoose models (User, Subscription)
├── routes/               # Route definitions
├── utils/                # Utility functions (email templates, sending mail)
├── .env.*.local          # Environment config files
├── app.js                # Main server entry point
└── package.json          # Project metadata and dependencies
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/subscription-tracker.git
cd subscription-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create and configure the following environment files:

- `.env.development.local`
- `.env.production.local`

Include the necessary keys for:

- MongoDB URI
- Email service (SMTP)
- JWT secret
- Arcjet keys

### 4. Run the application

#### Development

```bash
npm run dev
```

#### Production

```bash
npm start
```

---

## 🛠 Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/about/)
- [Upstash Workflows](https://upstash.com/workflows)
- [Arcjet](https://arcjet.com/)
- [ESLint](https://eslint.org/)

---

## 📬 API Endpoints

| Method | Route                      | Description                     |
|--------|----------------------------|---------------------------------|
| POST   | `/api/v1/auth/sign-in`        | Authenticate user               |
| POST   | `/api/v1/auth/sign-up`        | Register a new user             |
| GET    | `/api/v1/users`               | Get all users (admin)           |
| GET    | `/api/v1/subscriptions`       | List all subscriptions          |
| POST   | `/api/v1/subscriptions`       | Create a new subscription       |
| POST   | `/api/v1/workflows`           | Get workflow-related actions    |

> Additional routes and logic can be explored in the `routes/` and `controllers/` folders.

---

## ✉️ Email Templates

Located in `utils/email-template.js` and used via `utils/send-email.js`, these templates ensure that users receive properly formatted emails.

---

## 🧪 Linting

Lint the project with:

```bash
npm run lint
```

(ESLint is configured with `@eslint/js` and `globals`)

---

## 👨‍💻 Developer Notes

- Uses modern ES Modules (`"type": "module"`)
- Configurable via environment variables
- Highly modular — controllers, models, and routes are separated

---

## 📄 License

MIT License

---

## 🤝 Contributing

PRs and suggestions are welcome. Please follow the existing project structure and style.

---

## ✨ Acknowledgements

Special thanks to:

- [Arcjet](https://arcjet.com/)
- [Upstash](https://upstash.com/)
- [Day.js](https://day.js.org/)