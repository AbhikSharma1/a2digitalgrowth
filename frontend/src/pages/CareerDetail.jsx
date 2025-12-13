import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Users, CheckCircle, DollarSign } from 'lucide-react';



const CareerDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobDetail();
    }, [id]);

    if (loading) {
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
                    <p className="text-gray-400 mb-8">The position you're looking for doesn't exist.</p>
                    <Link to="/career" className="text-cyan-400 hover:text-cyan-300 flex items-center justify-center">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Careers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24">
            <div className="max-w-4xl mx-auto px-6 py-12">
                
                {/* Back Button */}
                <Link to="/career" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to All Positions
                </Link>

                {/* Job Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-900 rounded-xl p-8 mb-8 border border-white/10"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">{job.title}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-300">
                        <div className="flex items-center">
                            <Users size={18} className="mr-2 text-cyan-400" />
                            {job.department}
                        </div>
                        <div className="flex items-center">
                            <Clock size={18} className="mr-2 text-cyan-400" />
                            {job.type}
                        </div>
                        <div className="flex items-center">
                            <MapPin size={18} className="mr-2 text-cyan-400" />
                            {job.location}
                        </div>
                        {job.experience && (
                            <div className="flex items-center">
                                <CheckCircle size={18} className="mr-2 text-cyan-400" />
                                {job.experience.min}-{job.experience.max} years experience
                            </div>
                        )}
                        {job.salary && job.salary.min && (
                            <div className="flex items-center">
                                <DollarSign size={18} className="mr-2 text-cyan-400" />
                                ${job.salary.min} - ${job.salary.max} {job.salary.currency}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Job Description */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">About This Role</h2>
                    <p className="text-gray-300 leading-relaxed">{job.description}</p>
                </motion.section>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
                        <ul className="space-y-2">
                            {job.requirements.map((req, index) => (
                                <li key={index} className="flex items-start text-gray-300">
                                    <CheckCircle size={18} className="mr-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Key Responsibilities</h2>
                        <ul className="space-y-2">
                            {job.responsibilities.map((resp, index) => (
                                <li key={index} className="flex items-start text-gray-300">
                                    <CheckCircle size={18} className="mr-3 mt-0.5 text-fuchsia-400 flex-shrink-0" />
                                    {resp}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Required Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm border border-cyan-400/30">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
                        <ul className="space-y-2">
                            {job.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start text-gray-300">
                                    <CheckCircle size={18} className="mr-3 mt-0.5 text-lime-400 flex-shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {/* Apply Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                >
                    <Link
                        to={`/careers/${id}/apply`}
                        className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition duration-300"
                    >
                        Apply for This Position
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default CareerDetail;