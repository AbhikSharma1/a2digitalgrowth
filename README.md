# A3 Digital Growth — Official Website

A3 Digital Growth is a full-stack digital agency website built from scratch using the MERN stack. It's not just a portfolio site — it's a complete business platform with a powerful admin panel, a career system, service request management, team management, and a lot more. Everything on the frontend is connected to a real backend with a live database.

---

## What This Project Is

This is the official website for A3 Digital Growth, a digital agency that offers services like web development, SEO, graphic designing, video editing, social media marketing, and AI automation. The website is designed to look modern and futuristic — dark theme, glowing cyan accents, smooth animations, and floating elements throughout every page.

The site is fully responsive, works on all screen sizes, and has a complete admin panel where the team can manage everything — from job postings to team members to client service requests — without touching any code.

---

## Tech Stack

### Frontend
- **React** (with Vite for fast development and builds)
- **Tailwind CSS** for all styling
- **Framer Motion** for animations — floating titles, floating logos, page transitions, hover effects
- **Lucide React** for icons throughout the UI

### Backend
- **Node.js** with **Express.js** as the server framework
- **MongoDB** with **Mongoose** for the database
- **JWT (JSON Web Tokens)** for admin authentication
- **Multer** for handling file uploads (resumes, media)
- **Nodemailer** for sending email notifications
- **Bcrypt.js** for password hashing
- **Helmet** for security headers
- **Express Rate Limiter** to prevent abuse

---

## Pages and What They Do

### Home (`/`)
The landing page. Has a full-screen hero section with a floating animated title, floating tech logos (React, Node, etc.) in the background, a services overview section, an about section with brand stats (30+ brands, 200+ videos edited), client logos, and a call-to-action section. Everything animates in as you scroll.

### About (`/about`)
Tells the story of A3 Digital Growth. Covers the company's core philosophy (collaborative mastery, impact-driven results, future-proof technology), the full tool stack used for development and creative work, and a team introduction section. Has a final CTA at the bottom.

### Services (`/services`)
A complete breakdown of every service the agency offers, organized into three categories:

- **Development & AI** — Web Design & Development (MERN), Software Development, AI Works & Automation
- **Digital Marketing & Growth** — SEO, Facebook/Instagram/Google/YouTube Ads, Social Media Marketing, Content Marketing, Lead Generation
- **Creative & Design** — Graphics Designing, Advertisement Design, Banner/Poster Design, Cards Design, Logo Designing, Video Editing, VFX Video Editing

Also includes a technology highlight section and a 4-step growth methodology timeline (Discover → Engineer → Deploy → Scale).

### Portfolio (`/portfolio`)
Showcases the agency's work. Has a project grid with a "Load More" feature, a developer insights section, a live team member section (pulled from the admin panel), a trusted partners ticker, and client testimonials.

### Career (`/career`)
Lists all open job positions. Jobs are created and managed from the admin panel — so when an admin adds a new job, it shows up here automatically. Also has a company culture section and a perks & benefits section.

### Career Detail (`/careers/:id`)
Shows the full details of a specific job — description, requirements, responsibilities, required skills, experience range, and salary. Has an "Apply Now" button that leads to the application form.

### Career Application (`/careers/:id/apply`)
A complete job application form where candidates can fill in their details, write a cover letter, and upload their resume (PDF/DOC/DOCX, max 5MB). The application gets saved to the database and shows up in the admin panel.

### Contact (`/contact`)
A split-screen contact page. Left side has floating tech logos and contact details (email, phone, location). Right side has a full contact form with name, email, phone, subject, service interest dropdown, and message. Submissions are saved to the database and an email notification is sent.

### Service Request (`/service-request`)
A dedicated form for clients who want to request a specific service. They can select the service type, budget range, timeline, and describe their project. These requests show up in the admin panel's Service Requests tab.

### Admin (`/admin`)
The full admin panel — protected by JWT authentication. Only accessible with valid credentials.

---

## Admin Panel — Full Breakdown

The admin panel is the backbone of the website. Everything is managed from here.

### Login
Admins log in with a username and password. The system uses JWT tokens stored in localStorage. Tokens expire after 24 hours.

### Dashboard
Shows live stats — total contacts received, service requests, job applications, and active job postings. Also shows the 5 most recent contacts and 5 most recent job applications.

### Content Manager
Lets admins add and manage website content using a simple title + content structure. Supports plain text, image URLs, and HTML content with a live preview.

### Job Manager
Full CRUD for job postings. Admins can create jobs with title, department, type (Full-Time/Part-Time/Contract/Internship), location, description, requirements, responsibilities, required skills, experience range, salary range, and priority. Jobs can be toggled active/inactive. Active jobs automatically appear on the Career page.

### Team Manager
Admins can add team members with name, position, bio, profile image URL, skills, experience, email, LinkedIn, and GitHub. Members can be toggled active/inactive. Active members show up on the Portfolio page automatically.

### Contacts
View all contact form submissions in a table. Shows name, email, subject, date, and status.

### Job Applications
View all job applications submitted through the career application form. Shows applicant name, email, job title, experience, and applied date. Admins can update the application status (Applied → Screening → Interview → Selected → Rejected → On Hold) and view the uploaded resume.

### Service Requests
View and manage all service requests submitted by clients. Can filter by status and service type. Admins can update the status (Pending → Active → Inactive → Completed → Cancelled) and priority (Low → Medium → High → Urgent).

### Media
Upload images and files directly from the admin panel. Files are stored in the server's uploads directory.

### Admin Users
Manage all admin accounts from one place. Admins can:
- Create new admin accounts with username, email, password, and role
- Toggle any admin's active/inactive status
- Reset any admin's password
- Delete admin accounts
- Assign roles: `super-admin`, `admin`, or `editor`

All new admin accounts are created as active by default so they can log in immediately.

### Settings
Update general site settings (site name, emails, phone, address) and toggle system settings like email notifications and maintenance mode. Also has a dedicated "Change Password" section where the logged-in admin can update their own password securely.

---

## Security

- All admin routes are protected with JWT middleware
- Passwords are hashed using bcrypt with a salt round of 12
- Rate limiting is applied to all API routes (100 requests per 15 minutes per IP)
- Helmet.js adds security headers to every response
- File uploads are validated by MIME type and size
- CORS is configured to only allow requests from the frontend origin

---

## Local Setup

### Requirements
- Node.js v18 or higher
- MongoDB running locally or a MongoDB Atlas URI
- npm

### 1. Clone the repo
```bash
git clone https://github.com/your-username/a3-digital-growth.git
cd a3-digital-growth
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/a3digital
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```

Start the backend:
```bash
npm start
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

### 4. Create the first admin
```bash
cd backend
node scripts/createAdmin.js
```

Default credentials:
```
Username: admin
Password: admin123
```

Change your password immediately after first login from the Settings tab.

---

## Deploying on Render

### Backend
1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add these environment variables:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
```

### Frontend
1. Go to [render.com](https://render.com) → New Static Site
2. Connect your GitHub repo
3. Set:
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add this environment variable:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

> After deploying the backend, replace all `http://localhost:5000` references in the frontend files with your actual Render backend URL before building.

---

## API Reference

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| POST | `/api/services/request` | Submit service request |
| POST | `/api/careers/apply` | Submit job application |
| GET | `/api/admin/jobs/public` | Get all active jobs |
| GET | `/api/admin/team/public` | Get all active team members |

### Admin Endpoints (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET/POST/PUT/DELETE | `/api/admin/jobs` | Job management |
| GET/POST/PUT/DELETE | `/api/admin/team` | Team management |
| GET/POST/PUT/DELETE | `/api/admin/content` | Content management |
| GET/POST/PUT/DELETE | `/api/admin/admins` | Admin user management |
| PUT | `/api/admin/admins/:id/reset-password` | Reset admin password |
| GET | `/api/admin/contacts` | View contact submissions |
| GET | `/api/admin/applications` | View job applications |
| PUT | `/api/admin/applications/:id` | Update application status |
| GET/PUT | `/api/admin/service-requests` | Service request management |
| POST | `/api/admin/upload` | Upload media file |
| PUT | `/api/admin/change-password` | Change own password |
| GET/PUT | `/api/admin/settings` | Site settings |

---

## Environment Variables

| Variable | What it does |
|----------|-------------|
| `PORT` | Port the backend server runs on (default 5000) |
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens — keep this private |
| `EMAIL_USER` | Gmail address used to send notification emails |
| `EMAIL_PASS` | Gmail app password (not your regular Gmail password) |
| `NODE_ENV` | Set to `production` when deploying |

---

## License

© 2026 A3 Digital Growth — All Rights Reserved.  
Developed by [Abhik@1623](https://abhik.kshitizproducts.cloud/)
