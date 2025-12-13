const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/a3digital', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const updateAdmin = async () => {
    try {
        // New credentials
        const newUsername = 'admin'; // Change this
        const newPassword = 'admin123'; // Change this
        
        // Check if admin exists
        let admin = await Admin.findOne({});
        
        if (admin) {
            // Update existing admin
            admin.username = newUsername;
            admin.password = newPassword; // Will be hashed by pre-save hook
            await admin.save();
            console.log('Admin credentials updated successfully!');
        } else {
            // Create new admin
            admin = new Admin({
                username: newUsername,
                password: newPassword, // Will be hashed by pre-save hook
                email: 'admin@a3digitalgrowth.com',
                role: 'super-admin'
            });
            await admin.save();
            console.log('Admin created successfully!');
        }
        
        console.log(`Username: ${newUsername}`);
        console.log(`Password: ${newPassword}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error updating admin:', error);
        process.exit(1);
    }
};

updateAdmin();