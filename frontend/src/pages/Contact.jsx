import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin, Code, Zap, Film, TrendingUp, Cpu, Server } from 'lucide-react';

// --- Data for Floating Logos ---
const techLogos = [
    { icon: Code, color: 'text-cyan-400', name: 'React', duration: 10 },
    { icon: Server, color: 'text-lime-400', name: 'Node.js', duration: 8 },
    { icon: Cpu, color: 'text-red-400', name: 'MongoDB', duration: 12 },
    { icon: Film, color: 'text-fuchsia-400', name: 'VFX', duration: 15 },
    { icon: TrendingUp, color: 'text-blue-400', name: 'SEO', duration: 9 },
    { icon: Zap, color: 'text-pink-400', name: 'Ads', duration: 11 },
];

// Reusable Floating Logo Component
const FloatingLogo = ({ icon: Icon, color, name, duration, x, y }) => (
    <motion.div
        animate={{
            x: [0, x * 0.5, 0], // Floating on X-axis
            y: [0, y * 0.5, 0], // Floating on Y-axis
            rotate: [0, 10, -10, 0], // Subtle rotation
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className={`absolute opacity-70 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]`}
        style={{ top: `${y}%`, left: `${x}%`, width: '50px', height: '50px' }}
    >
        <Icon className={`w-full h-full ${color}`} />
    </motion.div>
);

// --- Form Input Component (For Consistent Styling) ---
const FormInput = ({ label, name, type = 'text', required = true }) => (
    <div className="relative z-0 w-full mb-8 group">
        <input
            type={type}
            name={name}
            id={name}
            required={required}
            className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer"
            placeholder=" "
        />
        <label
            htmlFor={name}
            className="peer-focus:font-medium absolute text-base text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            {label}
        </label>
    </div>
);

const Contact = () => {
    // State for form submission feedback
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        const formData = new FormData(e.target);
        const serviceInterestMap = {
            'web_dev': 'web-development',
            'marketing': 'seo',
            'creative': 'video-editing',
            'software': 'software-development',
            'other': 'other'
        };

        const rawSubject = formData.get('subject');
        const rawServiceInterest = formData.get('serviceInterest');
        
        const data = {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            phone: formData.get('phone')?.trim() || '',
            subject: rawSubject?.trim() || `Project Inquiry - ${rawServiceInterest}`,
            message: formData.get('message')?.trim(),
            serviceInterest: serviceInterestMap[rawServiceInterest] || 'other'
        };
        
        // Validate required fields
        if (!data.name || data.name.length < 2) {
            setStatus('Error: Name must be at least 2 characters');
            setLoading(false);
            return;
        }
        if (!data.email || !data.email.includes('@')) {
            setStatus('Error: Please provide a valid email');
            setLoading(false);
            return;
        }
        if (!data.subject || data.subject.length < 5) {
            setStatus('Error: Subject must be at least 5 characters');
            setLoading(false);
            return;
        }
        if (!data.message || data.message.length < 10) {
            setStatus('Error: Message must be at least 10 characters');
            setLoading(false);
            return;
        }

        console.log('Submitting contact form with data:', data);
        
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data),
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(`HTTP ${response.status}: ${errorData.message || 'Server error'}`);
            }

            const result = await response.json();
            console.log('Success response:', result);
            setStatus('Success! Your message has been sent. We will connect soon.');
            e.target.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            
            if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
                setStatus('Error: Cannot connect to server. Please ensure the backend is running.');
            } else if (error.message.includes('HTTP')) {
                setStatus(`Error: ${error.message}`);
            } else {
                setStatus('Error: Failed to send message. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-20 w-full overflow-x-hidden">

            {/* 1. Header */}
            <header className="text-center py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ 
                        opacity: { duration: 0.8 },
                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                >
                    Let's <span className="text-cyan-400">Build Your Future</span> 🚀
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl px-4"
                >
                    Ready for MERN-powered development, cutting-edge creative, or strategic marketing? Tell us about your project.
                </motion.p>
            </header>

            {/* 2. Split-Screen Contact Section */}
            <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-gray-900/50 rounded-3xl shadow-2xl overflow-hidden border border-white/10">

                    {/* Left Panel: Tech Showcase & Contact Details */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="relative p-6 sm:p-10 lg:p-16 bg-gray-900/80 overflow-hidden"
                    >
                        <h2 className="text-3xl font-bold text-fuchsia-400 mb-6">Digital Synergy</h2>
                        <p className="text-gray-300 mb-10">
                            Our unified MERN and creative approach is designed for clients who demand performance and visual impact.
                        </p>

                        {/* Floating Logos (Tech Showcase) */}
                        <div className="absolute inset-0 z-0 opacity-10">
                            <div className="w-full h-full bg-grid-white/[0.05]"></div> {/* Subtle background grid */}
                            {techLogos.map((logo, index) => (
                                <FloatingLogo
                                    key={index}
                                    icon={logo.icon}
                                    color={logo.color}
                                    name={logo.name}
                                    duration={logo.duration}
                                    x={index * 15 + 10} // Distribute logos horizontally
                                    y={index * 18 + 5}  // Distribute logos vertically
                                />
                            ))}
                        </div>

                        {/* Contact Info (Z-Index above floating logos) */}
                        <div className="relative z-10 space-y-6 mt-16 text-lg">
                            <div className="flex items-center space-x-4">
                                <Mail className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <p>a3digitalgrowth@gmail.com</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Phone className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <p>+91 7050384263 (For Sales/Dev/Designing)</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <p>Serving Clients Worldwide (HQ: India)</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Panel: Contact Form */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="p-6 sm:p-10 lg:p-16"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Initiate Project Inquiry</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <FormInput label="Full Name" name="name" />
                            <FormInput label="Email Address" name="email" type="email" />
                            <FormInput label="Phone Number" name="phone" required={false} />
                            <FormInput label="Subject" name="subject" />

                            {/* Service Interest Dropdown */}
                            <div className="relative z-0 w-full mb-8 group">
                                <select
                                    name="serviceInterest"
                                    id="serviceInterest"
                                    required
                                    defaultValue=""
                                    className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer"
                                >
                                    <option value="" disabled className="bg-gray-800 text-gray-500">Select Service of Interest</option>
                                    <option value="web_dev" className="bg-gray-800">Web Development (MERN)</option>
                                    <option value="marketing" className="bg-gray-800">Digital Marketing & SEO</option>
                                    <option value="creative" className="bg-gray-800">Video Editing & Design</option>
                                    <option value="software" className="bg-gray-800">Custom Software/AI</option>
                                    <option value="other" className="bg-gray-800">General Inquiry</option>
                                </select>
                            </div>

                            {/* Message Textarea */}
                            <div className="relative z-0 w-full mb-8 group">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    required
                                    className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer"
                                    placeholder=" "
                                ></textarea>
                                <label
                                    htmlFor="message"
                                    className="peer-focus:font-medium absolute text-base text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Project Details / Message
                                </label>
                            </div>

                            {/* Status Message */}
                            {status && (
                                <p className={`text-sm font-semibold ${status.includes('Error') ? 'text-red-500' : 'text-lime-400'}`}>
                                    {status}
                                </p>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                className="w-full py-3 rounded-xl text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/30 hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        Send Inquiry <ArrowRight size={20} />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;