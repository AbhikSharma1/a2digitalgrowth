const mongoose = require('mongoose');

const taskReportSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    reportType: {
        type: String,
        enum: ['Progress Update', 'Completion Report', 'Issue Report', 'Daily Report'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    workCompleted: {
        type: String,
        required: true
    },
    hoursWorked: {
        type: Number,
        required: true,
        min: 0
    },
    progressPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    challenges: {
        type: String,
        default: ''
    },
    nextSteps: {
        type: String,
        default: ''
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completionNotes: {
        type: String,
        default: ''
    },
    attachments: [{
        filename: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now }
    }],
    adminReview: {
        reviewed: { type: Boolean, default: false },
        reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
        reviewDate: Date,
        feedback: String,
        approved: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});

// Index for efficient queries
taskReportSchema.index({ taskId: 1, employeeId: 1, createdAt: -1 });

module.exports = mongoose.model('TaskReport', taskReportSchema);