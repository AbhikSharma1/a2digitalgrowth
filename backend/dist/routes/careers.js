const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Career = require('../models/Career');
const { sendEmail } = require('../utils/emailService');
const router = express.Router();

// Add CORS preflight handling
router.options('/apply', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (allowedMimes.includes(file.mimetype)) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
        }
    }
});

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false,
                message: 'File size too large. Maximum 5MB allowed.' 
            });
        }
        return res.status(400).json({ 
            success: false,
            message: `Upload error: ${err.message}` 
        });
    }
    if (err) {
        return res.status(400).json({ 
            success: false,
            message: err.message 
        });
    }
    next();
};

// POST /api/careers/apply - Submit job application
router.post('/apply', (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ 
                        success: false,
                        message: 'File size too large. Maximum 5MB allowed.' 
                    });
                }
                return res.status(400).json({ 
                    success: false,
                    message: `Upload error: ${err.message}` 
                });
            }
            return res.status(400).json({ 
                success: false,
                message: err.message 
            });
        }
        next();
    });
}, [
    body('jobId').notEmpty().withMessage('Job ID is required'),
    body('jobTitle').notEmpty().withMessage('Job title is required'),
    body('applicantName').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('experience').notEmpty().withMessage('Experience level is required'),
    body('noticePeriod').notEmpty().withMessage('Notice period is required')
], async (req, res) => {
    try {
        console.log('Career application received:', JSON.stringify(req.body, null, 2));
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Career validation errors:', JSON.stringify(errors.array(), null, 2));
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed', 
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg,
                    value: err.value
                }))
            });
        }

        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: 'Resume file is required. Please upload your resume in PDF, DOC, or DOCX format.' 
            });
        }

        const applicationData = {
            ...req.body,
            resumeUrl: req.file.path,
            skills: req.body.skills ? req.body.skills.split(',').map(skill => skill.trim()) : []
        };

        const application = new Career(applicationData);
        await application.save();

        res.status(201).json({ 
            success: true,
            message: 'Application submitted successfully! We will contact you within 3-5 business days.',
            data: {
                applicationId: application._id,
                jobTitle: application.jobTitle,
                applicantName: application.applicantName
            }
        });

        // Send notification email to admin (runs in background)
        setImmediate(async () => {
            try {
                const adminEmailContent = `
                    New Job Application Received:
                    
                    Position: ${application.jobTitle}
                    Applicant: ${application.applicantName}
                    Email: ${application.email}
                    Phone: ${application.phone}
                    Experience: ${application.experience} years
                    Current Company: ${application.currentCompany || 'Not provided'}
                    Current Role: ${application.currentRole || 'Not provided'}
                    Expected Salary: ${application.expectedSalary || 'Not provided'}
                    Notice Period: ${application.noticePeriod}
                    Location: ${application.location || 'Not provided'}
                    Skills: ${application.skills.join(', ')}
                    
                    Portfolio: ${application.portfolioUrl || 'Not provided'}
                    LinkedIn: ${application.linkedinUrl || 'Not provided'}
                    GitHub: ${application.githubUrl || 'Not provided'}
                    
                    Cover Letter:
                    ${application.coverLetter || 'Not provided'}
                    
                    Resume: ${application.resumeUrl}
                `;

                await sendEmail(
                    process.env.ADMIN_EMAIL,
                    `New Application: ${application.jobTitle} - ${application.applicantName}`,
                    adminEmailContent
                );

                // Send confirmation email to applicant
                const applicantEmailContent = `
                    Dear ${application.applicantName},
                    
                    Thank you for applying for the ${application.jobTitle} position at A3 Digital Growth!
                    
                    We have received your application and our HR team will review it shortly. We will contact you within 3-5 business days regarding the next steps.
                    
                    Application Details:
                    - Position: ${application.jobTitle}
                    - Application ID: ${application._id}
                    - Submitted: ${new Date().toLocaleDateString()}
                    
                    Best regards,
                    A3 Digital Growth HR Team
                `;

                await sendEmail(
                    application.email,
                    `Application Received - ${application.jobTitle}`,
                    applicantEmailContent
                );
            } catch (emailError) {
                console.log('Email service not configured or failed:', emailError.message);
            }
        });
    } catch (error) {
        console.error('Career application error:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed', 
                error: error.message
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: 'Failed to submit application',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// GET /api/careers/applications - Get all applications (admin only)
router.get('/applications', async (req, res) => {
    try {
        const { status, jobId, page = 1, limit = 10 } = req.query;
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
        console.error('Get applications error:', error);
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
});

// PUT /api/careers/applications/:id - Update application status
router.put('/applications/:id', async (req, res) => {
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

        // Send status update email to applicant
        let emailContent = `
            Dear ${application.applicantName},
            
            Your application for ${application.jobTitle} has been updated.
            
            Status: ${status.charAt(0).toUpperCase() + status.slice(1)}
        `;

        if (interviewDate) {
            emailContent += `\nInterview Date: ${new Date(interviewDate).toLocaleDateString()}`;
        }

        if (feedback) {
            emailContent += `\n\nFeedback: ${feedback}`;
        }

        emailContent += `\n\nBest regards,\nA3 Digital Growth HR Team`;

        await sendEmail(
            application.email,
            `Application Update - ${application.jobTitle}`,
            emailContent
        );

        res.json(application);
    } catch (error) {
        console.error('Update application error:', error);
        res.status(500).json({ message: 'Failed to update application' });
    }
});

// GET /api/careers/jobs - Get available job positions
router.get('/jobs', async (req, res) => {
    try {
        const jobs = [
            { id: 1, title: "Senior MERN Stack Developer", department: "Development", type: "Full-Time", location: "Remote/Hybrid" },
            { id: 2, title: "Creative & Video Editor (VFX Focus)", department: "Creative", type: "Contract", location: "Remote" },
            { id: 3, title: "Digital Marketing Specialist (SEO/PPC)", department: "Marketing", type: "Full-Time", location: "Remote/Hybrid" },
            { id: 4, title: "AI/Automation Engineer", department: "Development", type: "Full-Time", location: "Remote" }
        ];
        
        res.json(jobs);
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

module.exports = router;