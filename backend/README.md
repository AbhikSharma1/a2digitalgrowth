# A3 Digital Growth Backend

MERN stack backend for A3 Digital Growth website.

## Features

- **Contact Management**: Handle contact form submissions with email notifications
- **Career Applications**: Job applications with CV upload and email notifications  
- **Service Requests**: Service inquiries with detailed project information
- **Admin Dashboard**: Authentication and management interface
- **Email Service**: Automated email notifications for all interactions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/a3digital
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@a3digitalgrowth.com
ADMIN_PASSWORD=admin123
```

3. Start MongoDB service

4. Seed services data:
```bash
node seeders/serviceSeeder.js
```

5. Start server:
```bash
npm run dev
```

## API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/contact/:id` - Update contact status

### Careers  
- `POST /api/careers/apply` - Submit job application with CV
- `GET /api/careers/applications` - Get all applications (admin)
- `PUT /api/careers/applications/:id` - Update application status
- `GET /api/careers/jobs` - Get available positions

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get service by slug
- `POST /api/services/request` - Submit service request
- `GET /api/services/requests/all` - Get all requests (admin)
- `PUT /api/services/requests/:id` - Update request status

### Admin
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/analytics` - Analytics data

## File Uploads

CV files are stored in `uploads/resumes/` directory with size limit of 5MB.
Supported formats: PDF, DOC, DOCX.