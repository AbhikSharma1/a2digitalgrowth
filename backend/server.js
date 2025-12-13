const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (req.method === 'POST' && req.path === '/api/contact') {
        console.log('Contact form data:', req.body);
    }
    next();
});

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'A3 Digital Growth API is running', timestamp: new Date().toISOString() });
});

// Test route for debugging
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!', cors: 'enabled' });
});

// Debug route for contact form
app.post('/api/test-contact', (req, res) => {
    console.log('Test contact received:', req.body);
    res.json({ 
        message: 'Test contact received successfully', 
        receivedData: req.body,
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/services', require('./routes/services'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/employee', require('./routes/employee'));

// Create upload directories if they don't exist
const fs = require('fs');
const uploadDirs = ['uploads/admin', 'uploads/employee'];
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/a3digital')
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.log('MongoDB connection error:', err);
    console.log('Make sure MongoDB is running on your system');
});

// Error handling middleware
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 