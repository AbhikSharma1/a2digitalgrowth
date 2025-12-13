import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, User, Mail, Phone, Briefcase } from 'lucide-react';



const CareerApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [jobLoading, setJobLoading] = useState(true);
    
    const [formData, setFormData] = useState({
        applicantName: '',
        email: '',
        phone: '',
        experience: '',
        currentCompany: '',
        currentRole: '',
        expectedSalary: '',
        noticePeriod: '',
        location: '',
        skills: '',
        portfolioUrl: '',
        linkedinUrl: '',
        githubUrl: '',
        coverLetter: ''
    });
    
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchJobDetail = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/jobs/public');
            if (response.ok) {
                const jobs = await response.json();
                const foundJob = jobs.find(j => j._id === id);
                setJob(foundJob);
            }
        } catch (error) {
            console.error('Failed to fetch job details:', error);
        } finally {
            setJobLoading(false);
        }
    };

    useEffect(() => {
        fetchJobDetail();
    }, [id]);

    if (jobLoading) {
        return (
            <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
                    <Link to="/career" className="text-cyan-400 hover:text-cyan-300">Back to Careers</Link>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Validate required fields
        if (!formData.applicantName || formData.applicantName.length < 2) {
            setMessage('Name must be at least 2 characters');
            setLoading(false);
            return;
        }
        if (!formData.email || !formData.email.includes('@')) {
            setMessage('Please provide a valid email');
            setLoading(false);
            return;
        }
        if (!formData.phone) {
            setMessage('Phone number is required');
            setLoading(false);
            return;
        }
        if (!formData.experience) {
            setMessage('Please select your experience level');
            setLoading(false);
            return;
        }
        if (!formData.noticePeriod) {
            setMessage('Please select your notice period');
            setLoading(false);
            return;
        }
        if (!resume) {
            setMessage('Please upload your resume');
            setLoading(false);
            return;
        }

        const submitData = new FormData();
        submitData.append('jobId', id);
        submitData.append('jobTitle', job.title);
        
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });
        
        if (resume) {
            submitData.append('resume', resume);
        }

        try {
            const response = await fetch('http://localhost:5000/api/careers/apply', {
                method: 'POST',
                body: submitData
            });

            const result = await response.json();
            
            if (!response.ok) {
                if (result.errors) {
                    setMessage(result.errors.map(err => err.message).join(', '));
                } else {
                    setMessage(result.message || 'Application submission failed');
                }
                return;
            }

            setMessage('Application submitted successfully! We will contact you within 3-5 business days.');
            setTimeout(() => navigate('/career'), 3000);
        } catch (error) {
            console.error('Career application error:', error);
            setMessage('Cannot connect to server. Please check if the backend is running on port 5000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24">
            <div className="max-w-4xl mx-auto px-6 py-12">
                
                <Link to="/career" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Careers
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 rounded-xl p-8 mb-8 border border-white/10"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Apply for {job.title}</h1>
                    <p className="text-gray-400">{job.department} Department • {job.type} • {job.location}</p>
                    {job.experience && (
                        <p className="text-sm text-gray-500 mt-2">
                            Experience Required: {job.experience.min}-{job.experience.max} years
                        </p>
                    )}
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
                    
                    {/* Personal Information */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <User size={20} className="mr-2 text-cyan-400" />
                            Personal Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="applicantName"
                                placeholder="Full Name *"
                                value={formData.applicantName}
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
                                placeholder="Phone Number *"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Current Location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Briefcase size={20} className="mr-2 text-fuchsia-400" />
                            Professional Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <select
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            >
                                <option value="">Select Experience *</option>
                                <option value="0-1">0-1 years</option>
                                <option value="1-3">1-3 years</option>
                                <option value="3-5">3-5 years</option>
                                <option value="5-8">5-8 years</option>
                                <option value="8-plus">8+ years</option>
                            </select>
                            <select
                                name="noticePeriod"
                                value={formData.noticePeriod}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            >
                                <option value="">Notice Period *</option>
                                <option value="immediate">Immediate</option>
                                <option value="15-days">15 days</option>
                                <option value="1-month">1 month</option>
                                <option value="2-months">2 months</option>
                                <option value="3-months">3 months</option>
                            </select>
                            <input
                                type="text"
                                name="currentCompany"
                                placeholder="Current Company"
                                value={formData.currentCompany}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="text"
                                name="currentRole"
                                placeholder="Current Role"
                                value={formData.currentRole}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="text"
                                name="expectedSalary"
                                placeholder="Expected Salary"
                                value={formData.expectedSalary}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="text"
                                name="skills"
                                placeholder="Key Skills (comma separated)"
                                value={formData.skills}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Links & Portfolio */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4">Portfolio & Links</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <input
                                type="url"
                                name="portfolioUrl"
                                placeholder="Portfolio URL"
                                value={formData.portfolioUrl}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="url"
                                name="linkedinUrl"
                                placeholder="LinkedIn URL"
                                value={formData.linkedinUrl}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="url"
                                name="githubUrl"
                                placeholder="GitHub URL"
                                value={formData.githubUrl}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Upload size={20} className="mr-2 text-lime-400" />
                            Resume Upload *
                        </h3>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white"
                        />
                        <p className="text-gray-400 text-sm mt-2">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                    </div>

                    {/* Cover Letter */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4">Cover Letter</h3>
                        <textarea
                            name="coverLetter"
                            placeholder="Tell us why you're perfect for this role..."
                            value={formData.coverLetter}
                            onChange={handleInputChange}
                            rows="6"
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
                        {loading ? 'Submitting Application...' : 'Submit Application'}
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
};

export default CareerApplication;