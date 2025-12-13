import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Briefcase, DollarSign, Clock } from 'lucide-react';

const serviceData = {
    'web-design-&-development-(mern)': { title: 'Web Design & Development (MERN)', category: 'Development & AI' },
    'software-development': { title: 'Software Development', category: 'Development & AI' },
    'ai-works-&-automation': { title: 'AI Works & Automation', category: 'Development & AI' },
    'seo-(search-engine-optimization)': { title: 'SEO (Search Engine Optimization)', category: 'Digital Marketing & Growth' },
    'fb-&-insta-/-google-/-youtube-ads': { title: 'FB & Insta / Google / YouTube Ads', category: 'Digital Marketing & Growth' },
    'social-media-marketing': { title: 'Social Media Marketing', category: 'Digital Marketing & Growth' },
    'content-marketing': { title: 'Content Marketing', category: 'Digital Marketing & Growth' },
    'lead-generation': { title: 'Lead Generation', category: 'Digital Marketing & Growth' },
    'graphics-designing': { title: 'Graphics Designing', category: 'Creative & Design' },
    'advertisement-design': { title: 'Advertisement Design', category: 'Creative & Design' },
    'banner-|-poster-design': { title: 'Banner | Poster Design', category: 'Creative & Design' },
    'all-cards-design': { title: 'All Cards Design', category: 'Creative & Design' },
    'logo-designing': { title: 'Logo Designing', category: 'Creative & Design' },
    'video-editing': { title: 'Video Editing', category: 'Creative & Design' },
    'vfx-video-editing': { title: 'VFX Video Editing', category: 'Creative & Design' }
};

const ServiceRequest = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const service = serviceData[slug];
    
    const [formData, setFormData] = useState({
        clientName: '',
        email: '',
        phone: '',
        company: '',
        projectDescription: '',
        budget: '',
        timeline: '',
        requirements: '',
        additionalInfo: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!service) {
        return (
            <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <Link to="/services" className="text-cyan-400 hover:text-cyan-300">Back to Services</Link>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Validate required fields
        if (!formData.clientName || formData.clientName.length < 2) {
            setMessage('Name must be at least 2 characters');
            setLoading(false);
            return;
        }
        if (!formData.email || !formData.email.includes('@')) {
            setMessage('Please provide a valid email');
            setLoading(false);
            return;
        }
        if (!formData.projectDescription || formData.projectDescription.length < 20) {
            setMessage('Project description must be at least 20 characters');
            setLoading(false);
            return;
        }
        if (!formData.budget) {
            setMessage('Please select a budget range');
            setLoading(false);
            return;
        }
        if (!formData.timeline) {
            setMessage('Please select a timeline');
            setLoading(false);
            return;
        }

        const submitData = {
            serviceSlug: slug,
            serviceName: service.title,
            ...formData
        };

        try {
            const response = await fetch('http://localhost:5000/api/services/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            const result = await response.json();
            
            if (!response.ok) {
                if (result.errors) {
                    setMessage(result.errors.map(err => err.message).join(', '));
                } else {
                    setMessage(result.message || 'Validation failed');
                }
                return;
            }

            setMessage('Service request submitted successfully! We will contact you within 24-48 hours.');
            setTimeout(() => navigate('/services'), 3000);
        } catch (error) {
            console.error('Service request error:', error);
            setMessage('Cannot connect to server. Please check if the backend is running on port 5000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24">
            <div className="max-w-4xl mx-auto px-6 py-12">
                
                <Link to="/services" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Services
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 rounded-xl p-8 mb-8 border border-white/10"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Request {service.title}</h1>
                    <p className="text-gray-400">{service.category}</p>
                </motion.div>

                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {message}
                    </div>
                )}

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    
                    {/* Contact Information */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <User size={20} className="mr-2 text-cyan-400" />
                            Contact Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="clientName"
                                placeholder="Full Name *"
                                value={formData.clientName}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address *"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Briefcase size={20} className="mr-2 text-fuchsia-400" />
                            Project Details
                        </h3>
                        <textarea
                            name="projectDescription"
                            placeholder="Describe your project in detail... *"
                            value={formData.projectDescription}
                            onChange={handleInputChange}
                            required
                            rows="6"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none mb-4"
                        />
                        <textarea
                            name="requirements"
                            placeholder="Specific requirements (comma separated)"
                            value={formData.requirements}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                        />
                    </div>

                    {/* Budget & Timeline */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <DollarSign size={20} className="mr-2 text-lime-400" />
                            Budget & Timeline
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            >
                                <option value="">Select Budget Range *</option>
                                <option value="under-1000">Under $1,000</option>
                                <option value="1000-5000">$1,000 - $5,000</option>
                                <option value="5000-10000">$5,000 - $10,000</option>
                                <option value="10000-25000">$10,000 - $25,000</option>
                                <option value="25000-plus">$25,000+</option>
                                <option value="custom">Custom Budget</option>
                            </select>
                            <select
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            >
                                <option value="">Select Timeline *</option>
                                <option value="asap">ASAP</option>
                                <option value="1-month">Within 1 month</option>
                                <option value="2-3-months">2-3 months</option>
                                <option value="3-6-months">3-6 months</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4">Additional Information</h3>
                        <textarea
                            name="additionalInfo"
                            placeholder="Any additional information, references, or special requests..."
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Submitting Request...' : 'Submit Service Request'}
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
};

export default ServiceRequest;