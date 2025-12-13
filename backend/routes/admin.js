const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const Content = require('../models/Content');
const Job = require('../models/Job');
const Contact = require('../models/Contact');
const Career = require('../models/Career');
const ServiceRequest = require('../models/ServiceRequest');
const Team = require('../models/Team');
const Portfolio = require('../models/Portfolio');
const Employee = require('../models/Employee');
const Task = require('../models/Task');
const TaskReport = require('../models/TaskReport');
const { auth, requireRole } = require('../middleware/auth');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/admin/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// AUTH ROUTES
router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const admin = await Admin.findOne({ username, isActive: true });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DASHBOARD
router.get('/dashboard', auth, async (req, res) => {
    try {
        const stats = {
            contacts: await Contact.countDocuments(),
            serviceRequests: await ServiceRequest.countDocuments(),
            jobApplications: await Career.countDocuments(),
            activeJobs: await Job.countDocuments({ isActive: true }),
            recentContacts: await Contact.find().sort({ createdAt: -1 }).limit(5),
            recentApplications: await Career.find().sort({ createdAt: -1 }).limit(5)
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
});

// CONTENT MANAGEMENT
router.get('/content', auth, async (req, res) => {
    try {
        const { page, section } = req.query;
        const filter = {};
        if (page) filter.page = page;
        if (section) filter.section = section;
        
        const content = await Content.find(filter).sort({ page: 1, section: 1, key: 1 });
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch content' });
    }
});

router.post('/content', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const content = new Content(req.body);
        await content.save();
        res.status(201).json(content);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Content key already exists for this page/section' });
        }
        res.status(500).json({ message: 'Failed to create content' });
    }
});

router.put('/content/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update content' });
    }
});

router.delete('/content/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const content = await Content.findByIdAndDelete(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json({ message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete content' });
    }
});

// JOB MANAGEMENT
router.get('/jobs', auth, async (req, res) => {
    try {
        const jobs = await Job.find().sort({ priority: -1, createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

router.post('/jobs', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job' });
    }
});

router.put('/jobs/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job' });
    }
});

router.delete('/jobs/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job' });
    }
});

// GET /api/admin/jobs/public - Get active jobs for frontend
router.get('/jobs/public', async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true }).sort({ priority: -1, createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

// FILE UPLOAD
router.post('/upload', auth, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({
            filename: req.file.filename,
            path: req.file.path,
            url: `/uploads/admin/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed' });
    }
});

// CONTACTS MANAGEMENT
router.get('/contacts', auth, async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const filter = status ? { status } : {};
        
        const contacts = await Contact.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Contact.countDocuments(filter);
        
        res.json({
            contacts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contacts' });
    }
});

// JOB APPLICATIONS MANAGEMENT
router.get('/applications', auth, async (req, res) => {
    try {
        const { page = 1, limit = 10, status, jobId } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (jobId) filter.jobId = jobId;
        
        const applications = await Career.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Career.countDocuments(filter);
        
        res.json({
            applications,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
});

// HIRE CANDIDATE (Convert application to employee)
router.post('/hire-candidate', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        console.log('Hire request body:', req.body);
        const { applicationId, username, password, position, department } = req.body;
        
        if (!applicationId || !username || !password || !position || !department) {
            console.log('Missing required fields');
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Get application details
        console.log('Finding application:', applicationId);
        const application = await Career.findById(applicationId);
        if (!application) {
            console.log('Application not found');
            return res.status(404).json({ message: 'Application not found' });
        }
        console.log('Application found:', application.applicantName);
        
        // Check if username already exists
        const existingEmployee = await Employee.findOne({ username });
        if (existingEmployee) {
            console.log('Username already exists');
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        // Create employee account
        console.log('Creating employee with data:', {
            username,
            email: application.email,
            fullName: application.applicantName,
            position,
            department,
            applicationId
        });
        
        const employee = new Employee({
            username,
            password,
            email: application.email,
            fullName: application.applicantName,
            position,
            department,
            applicationId
        });
        
        console.log('Saving employee...');
        await employee.save();
        console.log('Employee saved successfully');
        
        // Update application status
        console.log('Updating application status...');
        await Career.findByIdAndUpdate(applicationId, { status: 'hired' });
        console.log('Application status updated');
        
        res.status(201).json({ message: 'Candidate hired successfully', employee: {
            id: employee._id,
            username: employee.username,
            email: employee.email,
            fullName: employee.fullName,
            position: employee.position
        }});
    } catch (error) {
        console.error('Hire candidate error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error: ' + error.message });
        }
        res.status(500).json({ message: 'Failed to hire candidate: ' + error.message });
    }
});

// EMPLOYEE MANAGEMENT
router.get('/employees', auth, async (req, res) => {
    try {
        const employees = await Employee.find().populate('applicationId', 'jobTitle').sort({ createdAt: -1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employees' });
    }
});

router.put('/employees/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update employee' });
    }
});

// TASK MANAGEMENT
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('assignedTo', 'fullName username position')
            .populate('assignedBy', 'username')
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

router.post('/tasks', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            assignedBy: req.user.id
        });
        await task.save();
        
        const populatedTask = await Task.findById(task._id)
            .populate('assignedTo', 'fullName username position')
            .populate('assignedBy', 'username');
            
        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task' });
    }
});

router.put('/tasks/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('assignedTo', 'fullName username position')
            .populate('assignedBy', 'username');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
    }
});

router.delete('/tasks/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task' });
    }
});

// TASK REPORTS MANAGEMENT
router.get('/task-reports', auth, async (req, res) => {
    try {
        const reports = await TaskReport.find()
            .populate('taskId', 'title project')
            .populate('employeeId', 'fullName username')
            .populate('adminReview.reviewedBy', 'username')
            .sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch task reports' });
    }
});

router.put('/task-reports/:id/review', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const { feedback, approved } = req.body;
        const report = await TaskReport.findByIdAndUpdate(
            req.params.id,
            {
                'adminReview.reviewed': true,
                'adminReview.reviewedBy': req.user.id,
                'adminReview.reviewDate': new Date(),
                'adminReview.feedback': feedback,
                'adminReview.approved': approved
            },
            { new: true }
        ).populate('taskId', 'title project')
         .populate('employeeId', 'fullName username');
         
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        
        // Update task status if report is completion report and approved
        if (report.reportType === 'Completion Report' && approved) {
            await Task.findByIdAndUpdate(report.taskId._id, {
                status: 'Completed',
                completedDate: new Date(),
                actualHours: report.hoursWorked
            });
        }
        
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Failed to review report' });
    }
});

// PORTFOLIO MANAGEMENT
router.get('/portfolio', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.find().sort({ order: -1, createdAt: -1 });
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch portfolio' });
    }
});

router.post('/portfolio', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const project = new Portfolio(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create project' });
    }
});

router.put('/portfolio/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const project = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project' });
    }
});

router.delete('/portfolio/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const project = await Portfolio.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project' });
    }
});

// GET /api/admin/portfolio/public - Get active projects for frontend
router.get('/portfolio/public', async (req, res) => {
    try {
        const portfolio = await Portfolio.find({ isActive: true }).sort({ order: -1, createdAt: -1 });
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch portfolio' });
    }
});

// UPDATE APPLICATION STATUS
router.put('/applications/:id', auth, async (req, res) => {
    try {
        const { status, interviewDate, feedback, rating } = req.body;
        const application = await Career.findByIdAndUpdate(
            req.params.id,
            { status, interviewDate, feedback, rating },
            { new: true }
        );
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update application' });
    }
});

// SERVICE REQUESTS MANAGEMENT
router.get('/service-requests', auth, async (req, res) => {
    try {
        // Add sample data if none exists
        const count = await ServiceRequest.countDocuments();
        if (count === 0) {
            await ServiceRequest.create({
                name: "Test User",
                email: "test@example.com",
                serviceType: "web-design-development",
                description: "Test service request",
                status: "pending",
                priority: "medium"
            });
            await ServiceRequest.create({
                name: "Another User",
                email: "user@example.com",
                serviceType: "software-development",
                description: "Another test request",
                status: "pending",
                priority: "high"
            });
        }
        
        const { page = 1, limit = 10, status, serviceType } = req.query;
        const filter = {};
        if (status && status !== '') filter.status = status;
        if (serviceType && serviceType !== '') filter.serviceType = serviceType;
        
        const serviceRequests = await ServiceRequest.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await ServiceRequest.countDocuments(filter);
        
        res.json({
            serviceRequests,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Service requests error:', error);
        res.status(500).json({ message: 'Failed to fetch service requests' });
    }
});

// UPDATE SERVICE REQUEST STATUS
router.put('/service-requests/:id', auth, async (req, res) => {
    try {
        const { status, priority, assignedTo, notes } = req.body;
        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            { status, priority, assignedTo, notes },
            { new: true }
        );
        
        if (!serviceRequest) {
            return res.status(404).json({ message: 'Service request not found' });
        }
        
        res.json(serviceRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update service request' });
    }
});

// TEAM MANAGEMENT
router.get('/team', auth, async (req, res) => {
    try {
        const team = await Team.find().sort({ order: 1, createdAt: -1 });
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch team members' });
    }
});

router.post('/team', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const teamMember = new Team(req.body);
        await teamMember.save();
        res.status(201).json(teamMember);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create team member' });
    }
});

router.put('/team/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const teamMember = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.json(teamMember);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update team member' });
    }
});

router.delete('/team/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const teamMember = await Team.findByIdAndDelete(req.params.id);
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete team member' });
    }
});

// GET /api/admin/team/public - Get active team members for frontend
router.get('/team/public', async (req, res) => {
    try {
        const team = await Team.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch team members' });
    }
});

// SETTINGS MANAGEMENT
router.get('/settings', auth, async (req, res) => {
    try {
        const settings = {
            siteName: 'A3 Digital Growth',
            adminEmail: 'admin@a3digitalgrowth.com',
            supportEmail: 'support@a3digitalgrowth.com',
            phone: '+1 (555) 123-4567',
            address: '123 Business St, City, State 12345',
            emailNotifications: true,
            maintenanceMode: false
        };
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch settings' });
    }
});

router.put('/settings', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const settings = req.body;
        // In a real app, save to database
        res.json({ message: 'Settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update settings' });
    }
});

// CHANGE PASSWORD
router.put('/change-password', auth, async (req, res) => {
    try {
        console.log('Change password request:', req.body);
        console.log('User ID from token:', req.admin._id);
        
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }
        
        const admin = await Admin.findById(req.admin._id);
        console.log('Found admin:', admin ? 'Yes' : 'No');
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        
        const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
        console.log('Current password valid:', isCurrentPasswordValid);
        
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        
        admin.password = newPassword;
        await admin.save();
        console.log('Password updated successfully');
        
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Failed to change password: ' + error.message });
    }
});

// ADMIN MANAGEMENT
router.get('/admins', auth, async (req, res) => {
    try {
        const admins = await Admin.find({}, '-password').sort({ createdAt: -1 });
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch admins' });
    }
});

router.post('/admins', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        
        const admin = new Admin({ username, email, password, role, isActive: true });
        await admin.save();
        
        const adminResponse = admin.toObject();
        delete adminResponse.password;
        
        res.status(201).json(adminResponse);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create admin' });
    }
});

router.put('/admins/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const { username, email, isActive, role, password } = req.body;
        
        // Check if username or email already exists for other admins
        if (username || email) {
            const existingAdmin = await Admin.findOne({
                $and: [
                    { _id: { $ne: req.params.id } },
                    { $or: [{ username }, { email }] }
                ]
            });
            if (existingAdmin) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }
        }
        
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (isActive !== undefined) updateData.isActive = isActive;
        if (role) updateData.role = role;
        
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, select: '-password' }
        );
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        
        // If password is provided, update it separately
        if (password && password.trim()) {
            const adminForPassword = await Admin.findById(req.params.id);
            adminForPassword.password = password;
            await adminForPassword.save();
        }
        
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update admin' });
    }
});

router.put('/admins/:id/reset-password', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const { newPassword } = req.body;
        
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        
        admin.password = newPassword;
        await admin.save();
        
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to reset password' });
    }
});

router.delete('/admins/:id', auth, requireRole(['super-admin', 'admin']), async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete admin' });
    }
});

module.exports = router;