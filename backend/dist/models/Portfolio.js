const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    clientCompany: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Web Development',
            'Software Development', 
            'SEO & Marketing',
            'Graphics Design',
            'Video & VFX',
            'Mobile App',
            'E-Commerce',
            'AI & Automation',
            'Other'
        ]
    },
    description: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    technologies: [{
        type: String,
        trim: true
    }],
    projectUrl: {
        type: String,
        trim: true
    },
    completionDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for sorting
portfolioSchema.index({ order: -1, createdAt: -1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);