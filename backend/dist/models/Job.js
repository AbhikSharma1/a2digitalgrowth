const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
        default: 'Full-Time'
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
        required: true
    }],
    responsibilities: [{
        type: String,
        required: true
    }],
    skills: [{
        type: String,
        required: true
    }],
    experience: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 10 }
    },
    salary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'USD' }
    },
    benefits: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    priority: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);