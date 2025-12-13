const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee');
const Task = require('../models/Task');
const TaskReport = require('../models/TaskReport');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/employee/');
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
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Employee auth middleware
const employeeAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const employee = await Employee.findById(decoded.id);
        
        if (!employee || !employee.isActive) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.employee = employee;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// EMPLOYEE LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const employee = await Employee.findOne({ username, isActive: true });

        if (!employee || !(await employee.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: employee._id, role: 'employee' },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            employee: {
                id: employee._id,
                username: employee.username,
                email: employee.email,
                fullName: employee.fullName,
                position: employee.position,
                department: employee.department
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET EMPLOYEE DASHBOARD
router.get('/dashboard', employeeAuth, async (req, res) => {
    try {
        const employeeId = req.employee._id;
        
        const stats = {
            totalTasks: await Task.countDocuments({ assignedTo: employeeId }),
            activeTasks: await Task.countDocuments({ assignedTo: employeeId, status: { $in: ['Assigned', 'In Progress'] } }),
            completedTasks: await Task.countDocuments({ assignedTo: employeeId, status: 'Completed' }),
            overdueTasks: await Task.countDocuments({ 
                assignedTo: employeeId, 
                status: { $in: ['Assigned', 'In Progress'] },
                dueDate: { $lt: new Date() }
            }),
            recentTasks: await Task.find({ assignedTo: employeeId })
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('assignedBy', 'username'),
            pendingReports: await TaskReport.countDocuments({ 
                employeeId, 
                'adminReview.reviewed': false 
            })
        };
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
});

// GET EMPLOYEE TASKS
router.get('/tasks', employeeAuth, async (req, res) => {
    try {
        const { status } = req.query;
        const filter = { assignedTo: req.employee._id };
        
        if (status) {
            filter.status = status;
        }
        
        const tasks = await Task.find(filter)
            .populate('assignedBy', 'username')
            .sort({ dueDate: 1, createdAt: -1 });
            
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

// UPDATE TASK STATUS
router.put('/tasks/:id/status', employeeAuth, async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, assignedTo: req.employee._id },
            { status },
            { new: true }
        ).populate('assignedBy', 'username');
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task status' });
    }
});

// SUBMIT TASK REPORT
router.post('/reports', employeeAuth, upload.array('attachments', 5), async (req, res) => {
    try {
        const {
            taskId,
            reportType,
            title,
            description,
            workCompleted,
            hoursWorked,
            progressPercentage,
            challenges,
            nextSteps,
            isCompleted,
            completionNotes
        } = req.body;
        
        // Prepare attachments
        const attachments = req.files ? req.files.map(file => ({
            filename: file.originalname,
            url: `/uploads/employee/${file.filename}`
        })) : [];
        
        const report = new TaskReport({
            taskId,
            employeeId: req.employee._id,
            reportType,
            title,
            description,
            workCompleted,
            hoursWorked: parseFloat(hoursWorked),
            progressPercentage: parseInt(progressPercentage) || 0,
            challenges,
            nextSteps,
            isCompleted: isCompleted === 'true',
            completionNotes,
            attachments
        });
        
        await report.save();
        
        // Update task progress
        await Task.findByIdAndUpdate(taskId, {
            status: isCompleted === 'true' ? 'Completed' : 'In Progress'
        });
        
        const populatedReport = await TaskReport.findById(report._id)
            .populate('taskId', 'title project')
            .populate('employeeId', 'fullName username');
            
        res.status(201).json(populatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit report' });
    }
});

// GET EMPLOYEE REPORTS
router.get('/reports', employeeAuth, async (req, res) => {
    try {
        const reports = await TaskReport.find({ employeeId: req.employee._id })
            .populate('taskId', 'title project')
            .populate('adminReview.reviewedBy', 'username')
            .sort({ createdAt: -1 });
            
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reports' });
    }
});

// GET EMPLOYEE PROFILE
router.get('/profile', employeeAuth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee._id)
            .populate('applicationId', 'jobTitle')
            .select('-password');
            
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});

// UPDATE EMPLOYEE PROFILE
router.put('/profile', employeeAuth, async (req, res) => {
    try {
        const { email, profileImage } = req.body;
        const employee = await Employee.findByIdAndUpdate(
            req.employee._id,
            { email, profileImage },
            { new: true }
        ).select('-password');
        
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile' });
    }
});

module.exports = router;