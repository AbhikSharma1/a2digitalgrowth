const express = require('express');
const { body, validationResult } = require('express-validator');
const ServiceRequest = require('../models/ServiceRequest');
const { Service } = require('../models/Service');
const { sendEmail } = require('../utils/emailService');
const router = express.Router();

// Add CORS preflight handling
router.options('/request', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ message: 'Services route is working!', timestamp: new Date().toISOString() });
});

// GET /api/services - Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ popularity: -1 });
        res.json(services);
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({ message: 'Failed to fetch services' });
    }
});

// GET /api/services/:slug - Get service by slug
router.get('/:slug', async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug, isActive: true });
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Increment view count
        service.views += 1;
        await service.save();

        res.json(service);
    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({ message: 'Failed to fetch service' });
    }
});

// POST /api/services/request - Submit service request
router.post('/request', async (req, res) => {
    try {
        console.log('Service request received:', JSON.stringify(req.body, null, 2));
        


        const serviceRequest = new ServiceRequest(req.body);
        await serviceRequest.save();

        res.status(201).json({ 
            success: true,
            message: 'Service request submitted successfully! We will contact you within 24-48 hours.',
            data: {
                requestId: serviceRequest._id,
                name: serviceRequest.name,
                serviceType: serviceRequest.serviceType
            }
        });

        // Send notification email to admin (optional - runs in background, won't fail the request)
        setImmediate(async () => {
            try {
                const adminEmailContent = `
                    New Service Request:
                    
                    Service Type: ${serviceRequest.serviceType}
                    Client: ${serviceRequest.name}
                    Email: ${serviceRequest.email}
                    Phone: ${serviceRequest.phone || 'Not provided'}
                    Company: ${serviceRequest.company || 'Not provided'}
                    Budget: ${serviceRequest.budget || 'Not specified'}
                    Timeline: ${serviceRequest.timeline || 'Not specified'}
                    
                    Description:
                    ${serviceRequest.description}
                    
                    Requirements:
                    ${serviceRequest.requirements || 'None provided'}
                `;

                await sendEmail(
                    process.env.ADMIN_EMAIL || 'admin@a3digitalgrowth.com',
                    `New Service Request: ${serviceRequest.serviceType}`,
                    adminEmailContent
                );

                // Send confirmation email to client
                const clientEmailContent = `
                    Dear ${serviceRequest.name},
                    
                    Thank you for your interest in our ${serviceRequest.serviceType} service!
                    
                    We have received your service request and our team will review it shortly. We will contact you within 24-48 hours with a detailed proposal and next steps.
                    
                    Request Details:
                    - Service Type: ${serviceRequest.serviceType}
                    - Budget Range: ${serviceRequest.budget || 'Not specified'}
                    - Timeline: ${serviceRequest.timeline || 'Not specified'}
                    - Request ID: ${serviceRequest._id}
                    
                    Best regards,
                    A3 Digital Growth Team
                `;

                await sendEmail(
                    serviceRequest.email,
                    `Service Request Received - ${serviceRequest.serviceType}`,
                    clientEmailContent
                );
            } catch (emailError) {
                console.log('Email service not configured or failed:', emailError.message);
            }
        });
    } catch (error) {
        console.error('Service request error:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false,
                message: 'Database validation failed', 
                error: error.message,
                details: Object.values(error.errors).map(e => e.message)
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: 'Failed to submit service request',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// GET /api/services/requests/all - Get all service requests (admin only)
router.get('/requests/all', async (req, res) => {
    try {
        const { status, serviceSlug, page = 1, limit = 10 } = req.query;
        const filter = {};
        
        if (status) filter.status = status;
        if (serviceSlug) filter.serviceSlug = serviceSlug;

        const requests = await ServiceRequest.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await ServiceRequest.countDocuments(filter);

        res.json({
            requests,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get service requests error:', error);
        res.status(500).json({ message: 'Failed to fetch service requests' });
    }
});

// PUT /api/services/requests/:id - Update service request
router.put('/requests/:id', async (req, res) => {
    try {
        const { status, priority, estimatedCost, notes } = req.body;
        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            { status, priority, estimatedCost, notes },
            { new: true }
        );

        if (!serviceRequest) {
            return res.status(404).json({ message: 'Service request not found' });
        }

        // Send status update email to client
        let emailContent = `
            Dear ${serviceRequest.clientName},
            
            Your service request for ${serviceRequest.serviceName} has been updated.
            
            Status: ${status.charAt(0).toUpperCase() + status.slice(1)}
        `;

        if (estimatedCost) {
            emailContent += `\nEstimated Cost: $${estimatedCost}`;
        }

        if (notes) {
            emailContent += `\n\nNotes: ${notes}`;
        }

        emailContent += `\n\nBest regards,\nA3 Digital Growth Team`;

        await sendEmail(
            serviceRequest.email,
            `Service Request Update - ${serviceRequest.serviceName}`,
            emailContent
        );

        res.json(serviceRequest);
    } catch (error) {
        console.error('Update service request error:', error);
        res.status(500).json({ message: 'Failed to update service request' });
    }
});

module.exports = router;