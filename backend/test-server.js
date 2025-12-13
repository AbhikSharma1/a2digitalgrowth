const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Test server is working!', timestamp: new Date().toISOString() });
});

app.post('/api/contact', (req, res) => {
    console.log('Contact form data received:', req.body);
    res.json({ message: 'Contact form submitted successfully!' });
});

app.post('/api/careers/apply', (req, res) => {
    console.log('Career application received');
    res.json({ message: 'Application submitted successfully!' });
});

app.post('/api/services/request', (req, res) => {
    console.log('Service request received:', req.body);
    res.json({ message: 'Service request submitted successfully!' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
    console.log('Try visiting: http://localhost:5000/api/test');
});