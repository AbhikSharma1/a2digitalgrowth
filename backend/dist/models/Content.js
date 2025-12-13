const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        enum: ['home', 'about', 'services', 'portfolio', 'career', 'contact']
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image', 'html'],
        default: 'text'
    },
    // Keep old fields for backward compatibility
    section: String,
    key: String,
    value: mongoose.Schema.Types.Mixed,
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

contentSchema.index({ page: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);