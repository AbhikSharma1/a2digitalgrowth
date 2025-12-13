import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Users, Shield, TrendingUp, ArrowRight } from 'lucide-react';

// --- Framer Motion Variants ---
const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cultureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
};



// --- Sub-Components ---

const CultureCard = ({ icon: Icon, title, desc, color }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        variants={cultureVariants}
        viewport={{ once: true, amount: 0.4 }}
        className="p-6 bg-gray-800 rounded-xl border border-white/10 hover:border-fuchsia-400/50 transition duration-300 transform hover:shadow-xl"
    >
        <Icon className={`w-10 h-10 mb-4 text-${color}-400 drop-shadow-[0_0_8px_rgba(var(--color-rgb),0.5)]`} />
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
);


const Career = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/jobs/public');
            if (response.ok) {
                const data = await response.json();
                setJobs(data);
            }
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="pt-20 bg-black min-h-screen text-white w-full overflow-x-hidden">
            
            {/* 1. HERO SECTION: Vision for Talent */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black">
                
                {/* Floating Logos */}
                <motion.img
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
                    className="w-14 absolute top-1/2 right-2 sm:right-16 opacity-70 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] z-0"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                />
                <motion.img
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png"
                    className="w-14 absolute top-1/2 left-2 sm:left-16 opacity-70 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] z-0"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                />
                <motion.img
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
                    className="w-14 absolute top-1/6 left-1 sm:top-1/3 sm:left-8 opacity-70 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] z-0"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5 }}
                />
                <motion.img
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968520.png"
                    className="w-12 absolute top-1/6 right-1 sm:top-1/3 sm:right-8 opacity-60 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] z-0"
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />
                <motion.img
                    src="https://cdn-icons-png.flaticon.com/512/919/919826.png"
                    className="w-12 absolute bottom-1/6 right-2 sm:bottom-1/3 sm:right-16 opacity-60 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] z-0"
                    animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                />


                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ 
                        opacity: { duration: 1 },
                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                    className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 z-10 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                >
                    Engineer Your <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Digital Career
                    </span> 🚀
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-300 max-w-3xl mx-auto text-xl z-10"
                >
                    Join A3 Digital Growth: Where cutting-edge MERN development meets boundless creative ambition. We build the future, together.
                </motion.p>
            </section>

            {/* 2. CULTURE & VALUES */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                viewport={{ once: true, amount: 0.1 }}
                className="py-20 px-6 max-w-7xl mx-auto"
            >
                <h2 className="text-4xl font-extrabold text-center mb-14">
                    Our <span className="text-fuchsia-400">Core Culture</span>
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <CultureCard 
                        icon={Code} 
                        title="Tech-First Mentality" 
                        desc="Deep focus on modern stacks (MERN), continuous learning, and clean, scalable code."
                        color="cyan"
                    />
                    <CultureCard 
                        icon={Users} 
                        title="Distributed & Flexible" 
                        desc="Work where you thrive. We prioritize outcome over office, supporting remote and hybrid models."
                        color="fuchsia"
                    />
                    <CultureCard 
                        icon={TrendingUp} 
                        title="Impact & Ownership" 
                        desc="Every role drives measurable client growth. Own your projects from concept to deployment."
                        color="blue"
                    />
                    <CultureCard 
                        icon={Shield} 
                        title="Creative Safety Net" 
                        desc="A supportive environment where experimentation is encouraged and new ideas are celebrated."
                        color="lime"
                    />
                </div>
            </motion.section>

            {/* 3. OPEN POSITIONS */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.1 }}
                className="py-20 px-6 bg-gray-900/50"
            >
                <h2 className="text-4xl font-extrabold text-center mb-14">
                    Available <span className="text-cyan-400">Digital Roles</span>
                </h2>
                <div className="max-w-4xl mx-auto space-y-4">
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                            <p className="text-gray-400 mt-4">Loading opportunities...</p>
                        </div>
                    ) : (
                        <>
                            {jobs.map((job, index) => (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="p-6 bg-gray-800 rounded-xl flex justify-between items-center border border-white/10 hover:border-cyan-400/50 transition duration-300 cursor-pointer"
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{job.title}</h3>
                                        <p className="text-sm text-gray-400">
                                            {job.department} • {job.type} • {job.location}
                                        </p>
                                        {job.experience && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Experience: {job.experience.min}-{job.experience.max} years
                                            </p>
                                        )}
                                    </div>
                                    <a href={`/careers/${job._id}`} className="flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition">
                                        Apply Now <ArrowRight size={18} className="ml-2" />
                                    </a>
                                </motion.div>
                            ))}

                            {/* Placeholder for no open roles */}
                            {jobs.length === 0 && (
                                <p className="text-center text-gray-500 py-10 text-lg">
                                    No current openings. Follow us for future opportunities to join the A3 Squad!
                                </p>
                            )}
                        </>
                    )}
                </div>
            </motion.section>

            {/* 4. PERKS & BENEFITS */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.1 }}
                className="py-20 px-6 max-w-7xl mx-auto"
            >
                <h2 className="text-4xl font-extrabold text-center mb-14">
                    Rewards for <span className="text-lime-400">Excellence</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {[
                        { title: "MERN Training Stipends", desc: "Dedicated budget for certifications, courses, and conferences focusing on modern tech." },
                        { title: "Flexible Time Off", desc: "Generous PTO policies that respect work-life balance and focus on output, not hours." },
                        { title: "Health & Wellness", desc: "Comprehensive benefits package designed to support the well-being of our remote team." },
                    ].map((perk, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="p-6 border border-lime-400/30 rounded-xl bg-gray-800/70"
                        >
                            <h3 className="text-2xl font-bold mb-2 text-lime-300">{perk.title}</h3>
                            <p className="text-gray-400">{perk.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* 5. FINAL CTA (Consistent) */}
            <section className="relative py-28 text-center text-white overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
                >
                    Don't See Your Role? <span className="text-fuchsia-400">Send Us Your Vision.</span>
                </motion.h2>

                <motion.a
                    href="/contact" // Directs to contact page for general applications
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-block px-10 py-4 rounded-2xl text-lg font-semibold
    bg-gradient-to-r from-fuchsia-500 to-pink-600 shadow-[0_0_25px_rgba(255,0,255,0.4)]
    overflow-hidden"
                >
                    Submit General Application
                </motion.a>
            </section>

        </div>
    );
};

export default Career;