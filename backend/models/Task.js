const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Assigned', 'In Progress', 'Completed', 'Overdue', 'Cancelled'],
        default: 'Assigned'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    completedDate: {
        type: Date
    },
    estimatedHours: {
        type: Number,
        default: 0
    },
    actualHours: {
        type: Number,
        default: 0
    },
    attachments: [{
        filename: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now }
    }],
    requirements: [{
        type: String,
        trim: true
    }],
    deliverables: [{
        type: String,
        trim: true
    }],
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Index for efficient queries
taskSchema.index({ assignedTo: 1, status: 1, dueDate: 1 });

module.exports = mongoose.model('Task', taskSchema);