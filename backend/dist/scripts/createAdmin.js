const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/a3digital');
        
        const adminData = {
            username: 'admin',
            email: 'admin@a3digital.com',
            password: 'admin123',
            role: 'super-admin'
        };

        const existingAdmin = await Admin.findOne({ username: adminData.username });
        
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const admin = new Admin(adminData);
        await admin.save();
        
        console.log('Admin user created successfully');
        console.log('Username:', adminData.username);
        console.log('Password:', adminData.password);
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();