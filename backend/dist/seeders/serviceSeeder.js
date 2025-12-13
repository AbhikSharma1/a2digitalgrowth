const mongoose = require('mongoose');
const { Service } = require('../models/Service');
require('dotenv').config();

const services = [
    {
        slug: 'web-design-&-development-(mern)',
        title: 'Web Design & Development (MERN)',
        category: 'Development & AI',
        description: 'Transform your digital presence with cutting-edge MERN stack development. We create high-performance, responsive websites that drive engagement and conversions.',
        features: [
            'Custom React.js frontend development',
            'Node.js and Express.js backend architecture',
            'MongoDB database design and optimization',
            'Responsive design for all devices',
            'SEO-optimized code structure',
            'Performance optimization and caching'
        ],
        process: [
            'Requirements analysis and planning',
            'UI/UX design and prototyping',
            'Frontend development with React',
            'Backend API development',
            'Database integration and testing',
            'Deployment and maintenance'
        ],
        deliverables: [
            'Fully functional web application',
            'Source code and documentation',
            'Admin panel (if required)',
            'Performance optimization report',
            '3 months free maintenance',
            'Training and handover session'
        ],
        timeline: '4-8 weeks',
        price: 'Starting from $2,500',
        popularity: 10
    },
    {
        slug: 'software-development',
        title: 'Software Development',
        category: 'Development & AI',
        description: 'Custom software solutions tailored to your business needs. From enterprise applications to SaaS platforms, we build scalable and robust software.',
        features: [
            'Custom application development',
            'Enterprise software solutions',
            'SaaS platform development',
            'API development and integration',
            'Cloud-native architecture',
            'Scalable and secure solutions'
        ],
        process: [
            'Business analysis and requirements',
            'System architecture design',
            'Development and coding',
            'Quality assurance testing',
            'Deployment and integration',
            'Support and maintenance'
        ],
        deliverables: [
            'Complete software solution',
            'Technical documentation',
            'User manuals and guides',
            'Testing reports',
            'Deployment assistance',
            'Ongoing support package'
        ],
        timeline: '8-16 weeks',
        price: 'Starting from $5,000',
        popularity: 8
    },
    {
        slug: 'ai-works-&-automation',
        title: 'AI Works & Automation',
        category: 'Development & AI',
        description: 'Leverage artificial intelligence and automation to streamline your business processes and gain competitive advantages.',
        features: [
            'Machine learning model development',
            'Process automation solutions',
            'Chatbot and AI assistant development',
            'Data analysis and insights',
            'Workflow automation',
            'AI integration services'
        ],
        process: [
            'AI strategy consultation',
            'Data collection and preparation',
            'Model development and training',
            'Integration and testing',
            'Deployment and monitoring',
            'Optimization and maintenance'
        ],
        deliverables: [
            'AI-powered solution',
            'Model documentation',
            'Integration guides',
            'Performance metrics',
            'Training materials',
            'Ongoing optimization'
        ],
        timeline: '6-12 weeks',
        price: 'Starting from $3,500',
        popularity: 9
    }
];

const seedServices = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/a3digital');
        console.log('Connected to MongoDB');
        
        console.log('Clearing existing services...');
        await Service.deleteMany({});
        
        console.log('Inserting new services...');
        await Service.insertMany(services);
        
        console.log('Services seeded successfully!');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
};

seedServices();