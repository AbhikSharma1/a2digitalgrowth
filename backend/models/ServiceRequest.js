const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
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
    serviceType: {
        type: String
    },
    budget: {
        type: String
    },
    timeline: {
        type: String
    },
    description: {
        type: String
    },
    requirements: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    priority: {
        type: String,
        default: 'medium'
    },
    assignedTo: {
        type: String,
        trim: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);