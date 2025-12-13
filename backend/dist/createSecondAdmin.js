const mongoose = require('mongoose');
const Admin = require('./models/Admin');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/a3digital', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createSecondAdmin = async () => {
    try {
        // Check if second admin already exists
        const existingAdmin = await Admin.findOne({ username: 'admin2' });
        
        if (existingAdmin) {
            console.log('Second admin already exists!');
            console.log(`Username: admin2`);
            process.exit(0);
        }
        
        // Create second admin
        const secondAdmin = new Admin({
            username: 'admin2',
            password: 'admin123', // Will be hashed by pre-save hook
            email: 'admin2@a3digitalgrowth.com',
            role: 'admin' // Both will have admin access
        });
        
        await secondAdmin.save();
        
        console.log('Second admin created successfully!');
        console.log('Username: admin2');
        console.log('Password: admin123');
        console.log('Email: admin2@a3digitalgrowth.com');
        console.log('Role: admin');
        
        // Show both admins
        const allAdmins = await Admin.find({}, 'username email role isActive');
        console.log('\nAll admin users:');
        allAdmins.forEach((admin, index) => {
            console.log(`${index + 1}. Username: ${admin.username}, Email: ${admin.email}, Role: ${admin.role}, Active: ${admin.isActive}`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating second admin:', error);
        process.exit(1);
    }
};

createSecondAdmin();