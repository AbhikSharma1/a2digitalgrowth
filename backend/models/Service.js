const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Development & AI', 'Digital Marketing & Growth', 'Creative & Design']
    },
    description: {
        type: String,
        required: true
    },
    features: [{
        type: String,
        required: true
    }],
    process: [{
        type: String,
        required: true
    }],
    deliverables: [{
        type: String,
        required: true
    }],
    timeline: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    popularity: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = { Service };