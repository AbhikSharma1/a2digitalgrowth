const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    applicantName: {
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
        required: true,
        trim: true
    },
    experience: {
        type: String,
        required: true,
        enum: ['0-1', '1-3', '3-5', '5-8', '8-plus']
    },
    currentCompany: {
        type: String,
        trim: true
    },
    currentRole: {
        type: String,
        trim: true
    },
    expectedSalary: {
        type: String,
        trim: true
    },
    noticePeriod: {
        type: String,
        enum: ['immediate', '15-days', '1-month', '2-months', '3-months'],
        required: true
    },
    location: {
        type: String,
        trim: true
    },
    skills: [{
        type: String,
        trim: true
    }],
    portfolioUrl: {
        type: String,
        trim: true
    },
    linkedinUrl: {
        type: String,
        trim: true
    },
    githubUrl: {
        type: String,
        trim: true
    },
    coverLetter: {
        type: String
    },
    resumeUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'screening', 'interview', 'selected', 'rejected', 'on-hold', 'hired'],
        default: 'applied'
    },
    interviewDate: {
        type: Date
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Career', careerSchema);