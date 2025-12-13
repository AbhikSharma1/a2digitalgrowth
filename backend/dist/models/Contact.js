const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    serviceInterest: {
        type: String,
        enum: ['web-development', 'software-development', 'ai-automation', 'seo', 'social-media', 'content-marketing', 'lead-generation', 'graphics-design', 'video-editing', 'other']
    },
    budget: {
        type: String,
        enum: ['under-1000', '1000-5000', '5000-10000', '10000-25000', '25000-plus', 'not-sure']
    },
    timeline: {
        type: String,
        enum: ['asap', '1-month', '2-3-months', '3-6-months', 'flexible']
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'in-progress', 'completed', 'closed'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);