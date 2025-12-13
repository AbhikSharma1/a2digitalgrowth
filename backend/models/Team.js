const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    skills: [{
        type: String,
        trim: true
    }],
    experience: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    github: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);