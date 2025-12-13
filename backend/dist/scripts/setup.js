const fs = require('fs');
const path = require('path');

const directories = [
    'uploads',
    'uploads/resumes'
];

directories.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

console.log('Setup completed successfully!');