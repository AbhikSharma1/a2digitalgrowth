const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/emailService');
const router = express.Router();

// Add CORS preflight handling
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

// POST /api/contact - Submit contact form
router.post('/', [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], async (req, res) => {
    try {
        console.log('Received request body:', JSON.stringify(req.body, null, 2));
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', JSON.stringify(errors.array(), null, 2));
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

        console.log('Contact form data received:', req.body);

        const contact = new Contact(req.body);
        await contact.save();

        // Send notification email to admin (optional - won't fail if email service is not configured)
        try {
            const adminEmailContent = `
                New Contact Form Submission:
                
                Name: ${contact.name}
                Email: ${contact.email}
                Phone: ${contact.phone || 'Not provided'}
                Company: ${contact.company || 'Not provided'}
                Subject: ${contact.subject}
                Service Interest: ${contact.serviceInterest || 'Not specified'}
                Budget: ${contact.budget || 'Not specified'}
                Timeline: ${contact.timeline || 'Not specified'}
                
                Message:
                ${contact.message}
            `;

            await sendEmail(
                process.env.ADMIN_EMAIL,
                `New Contact: ${contact.subject}`,
                adminEmailContent
            );

            // Send confirmation email to client
            const clientEmailContent = `
                Dear ${contact.name},
                
                Thank you for contacting A3 Digital Growth! We have received your inquiry and will get back to you within 24 hours.
                
                Your submission details:
                Subject: ${contact.subject}
                
                Best regards,
                A3 Digital Growth Team
            `;

            await sendEmail(
                contact.email,
                'Thank you for contacting A3 Digital Growth',
                clientEmailContent
            );
        } catch (emailError) {
            console.log('Email service not configured or failed:', emailError.message);
            // Continue without failing the request
        }

        res.status(201).json({ 
            success: true,
            message: 'Contact form submitted successfully',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                subject: contact.subject
            }
        });
    } catch (error) {
        console.error('Contact form error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Invalid data provided', 
                error: error.message 
            });
        }
        res.status(500).json({ 
            message: 'Failed to submit contact form',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', async (req, res) => {
    try {
        const { status, priority, page = 1, limit = 10 } = req.query;
        const filter = {};
        
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

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
        console.error('Get contacts error:', error);
        res.status(500).json({ message: 'Failed to fetch contacts' });
    }
});

// PUT /api/contact/:id - Update contact status
router.put('/:id', async (req, res) => {
    try {
        const { status, priority, notes } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status, priority, notes },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        console.error('Update contact error:', error);
        res.status(500).json({ message: 'Failed to update contact' });
    }
});

module.exports = router;