import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Users, Briefcase, Star, Code, ArrowRight, TrendingUp, Cpu, Server } from "lucide-react";

// --- Framer Motion Variants ---

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
};

const teamVariants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.8 } },
};

// --- Data Structures ---

const allProjects = [
    { id: 1, title: "E-Commerce Velocity Boost", category: "SEO & Web Dev", result: "+75% Organic Traffic", image: "https://placehold.co/600x400/003366/FFFFFF?text=Project+Ecom", clientCompany: "Sample Client" },
    { id: 2, title: "Viral Video Campaign", category: "Video & Ads", result: "1.2M Views in 30 Days", image: "https://placehold.co/600x400/990099/FFFFFF?text=Project+Video", clientCompany: "Sample Client" },
    { id: 3, title: "Custom MERN CRM", category: "Software Dev", result: "40% Workflow Efficiency", image: "https://placehold.co/600x400/004d40/FFFFFF?text=Project+MERN", clientCompany: "Sample Client" },
    { id: 4, title: "Complete Brand Identity", category: "Graphics Design", result: "100% Client Satisfaction", image: "https://placehold.co/600x400/cc5500/FFFFFF?text=Project+Design", clientCompany: "Sample Client" }
];



const partners = [
    
    { name: "Tech Corp", logo: "https://cdn-icons-png.flaticon.com/512/1051/1051266.png" }, 
    { name: "Design Studio", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png" }, 
    { name: "Growth Labs", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968512.png" }, 
    { name: "Local Business", logo: "https://cdn-icons-png.flaticon.com/512/1004/1004944.png" }, 
];
// --- Sub-Components ---

const FloatingLogoHeader = () => (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
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
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                A3 Digital Growth
            </span> Showcase 🚀
        </motion.h1>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-300 max-w-3xl mx-auto text-xl z-10"
        >
            Proof of excellence: Our projects, partners, and the people driving digital growth.
        </motion.p>
    </div>
);

const ProjectCard = ({ project, index }) => (
    <motion.div
        key={project._id || project.id}
        initial="hidden"
        whileInView="visible"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 255, 255, 0.5)" }}
        className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10 hover:border-cyan-400/50"
    >
        <div className="h-48 overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        </div>

        <div className="p-6">
            <span className="text-sm font-semibold uppercase text-fuchsia-400">{project.category}</span>
            <h3 className="text-2xl font-bold mt-1 mb-2 text-white">{project.title}</h3>
            <p className="text-sm text-gray-400 mb-3">Client: {project.clientCompany}</p>
            <div className="flex items-center text-cyan-400 font-medium">
                <Star className="w-4 h-4 mr-2" />
                <p>{project.result}</p>
            </div>
            {project.projectUrl && (
                <a 
                    href={project.projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10" 
                    aria-label={`View ${project.title} project`}
                />
            )}
        </div>
    </motion.div>
);

const TeamMemberCard = ({ member, index }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        variants={teamVariants}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: index * 0.2 }}
        className="p-6 bg-gray-900 rounded-xl shadow-lg border border-fuchsia-800/20 text-center"
    >
        <div className="relative w-24 h-24 mx-auto mb-4">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full border-4 border-zinc-400" />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.5, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border-2 border-zinc-700 rounded-2xl"
            ></motion.div>
        </div>
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        <p className="text-fuchsia-400 font-semibold text-sm uppercase mt-1">{member.position}</p>
        <p className="text-gray-400 text-sm mt-2">{member.experience}</p>
        {member.skills && member.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3 justify-center">
                {member.skills.slice(0, 2).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded">{skill}</span>
                ))}
            </div>
        )}
    </motion.div>
);

const TrustTicker = () => (
    <div className="overflow-hidden py-10 border-t border-b border-gray-700/50 mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-500 mb-6 uppercase tracking-wider">Trusted by Industry Leaders</h2>
        <motion.div
            className="flex flex-nowrap"
            animate={{ x: '-100%' }}
            transition={{ x: { duration: 10, ease: "linear", repeat: Infinity } }}
        >
            {[...partners, ...partners].map((partner, index) => ( // Duplicate for infinite scroll effect
                <div key={index} className="flex-shrink-0 w-48 h-20 flex items-center justify-center mx-10 opacity-70 hover:opacity-100 transition duration-300">
                    <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]" />
                </div>
            ))}
        </motion.div>
    </div>
);


const Portfolio = () => {
    const [visibleProjects, setVisibleProjects] = useState(4);
    const [teamMembers, setTeamMembers] = useState([]);
    const [projects, setProjects] = useState([]);
    const projectsPerPage = 4;

    const fetchTeamMembers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/team/public');
            if (response.ok) {
                const data = await response.json();
                setTeamMembers(data);
            }
        } catch (error) {
            console.error('Failed to fetch team members:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/portfolio/public');
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            setProjects(allProjects);
        }
    };

    const handleLoadMore = () => {
        setVisibleProjects((prev) => prev + projectsPerPage);
    };

    const hasMoreProjects = visibleProjects < projects.length;

    useEffect(() => {
        fetchTeamMembers();
        fetchProjects();
    }, []);

    return (
        <div className="pt-20 bg-black min-h-screen text-white w-full overflow-x-hidden">

            {/* 1. Header with Floating Logo */}
            <section className="relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
                <FloatingLogoHeader />
            </section>

            {/* 2. Project Showreel with 'View More' Logic */}
            <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full overflow-x-hidden">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 sm:mb-16">
                    Our <span className="text-cyan-400">Portfolio</span>
                </h2>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {projects.slice(0, visibleProjects).map((project, index) => (
                            <ProjectCard key={project._id || project.id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-12">
                        <p>No projects available at the moment.</p>
                    </div>
                )}

                {/* 'View More' Button */}
                {hasMoreProjects && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-fuchsia-500/30 hover:scale-105 transition"
                        >
                            View More Projects <ArrowRight size={18} />
                        </button>
                    </motion.div>
                )}
            </section>

            {/* 3. Developer Insights / Technical Showcase */}
            <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-900 w-full overflow-x-hidden">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 sm:mb-16">
                    Behind the Code: <span className="text-cyan-400">Developer Insights</span>
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        { icon: Code, title: "Scalable MERN APIs", desc: "Our back-end services are built on Node.js/Express, ensuring rapid response times and infinite scalability via MongoDB." },
                        { icon: Server, title: "Atomic Design Principles", desc: "We use React for component-driven development, leading to cleaner code and faster maintenance cycles." },
                        { icon: TrendingUp, title: "Performance First", desc: "Every project targets top Core Web Vitals (CWV) scores, minimizing load times and maximizing user experience." },
                    ].map((insight, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            variants={itemVariants}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="p-6 border border-cyan-500/30 rounded-xl bg-gray-800 hover:bg-gray-700/50 transition"
                        >
                            <insight.icon className="w-10 h-10 text-cyan-400 mb-4 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
                            <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                            <p className="text-gray-400 text-sm">{insight.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. Team Member Showcase */}
            <section className="py-12 sm:py-20 px-4 sm:px-6 w-full overflow-x-hidden">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 sm:mb-16">
                    The <span className="text-fuchsia-400">A3 Digital Growth's</span> Team 🐦‍🔥
                </h2>
                {teamMembers.length > 0 ? (
                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={member._id} member={member} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400">
                        <p>No team members available at the moment.</p>
                    </div>
                )}
            </section>

            {/* 5. Trusted Partners Ticker */}
            <section className="py-8 sm:py-10 px-4 sm:px-6 w-full overflow-x-hidden">
                <TrustTicker />
            </section>

            {/* 6. Client Feedback/Testimonials (Animated Grid) */}
            <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full overflow-x-hidden">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 sm:mb-16">
                    Client <span className="text-lime-400">Feedback Matrix</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        { feedback: "A3 transformed our digital presence. The MERN application they built is flawless and incredibly fast.", client: "The TechIndia, CEO" },
                        { feedback: "The video editing and VFX quality is top-tier. Our click-through rate on YouTube ads doubled instantly.", client: "Founder | The NityaMakeover" },
                        { feedback: "Their SEO strategy delivered results within three months. We now rank in the top 3 for our key terms.", client: "ASPL" },
                    ].map((review, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            variants={itemVariants}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="p-6 bg-gray-800 rounded-xl border border-lime-400/30 shadow-lg relative"
                        >
                            <Star className="w-5 h-5 text-lime-400 mb-3" />
                            <blockquote className="text-lg italic text-gray-300">"{review.feedback}"</blockquote>
                            <p className="text-sm font-semibold text-white mt-4">— {review.client}</p>
                            <ArrowRight className="absolute bottom-3 right-3 w-4 h-4 text-gray-700" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 7. Final CTA (Reusing existing style) */}
            <section className="relative py-16 sm:py-28 text-center text-white overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black w-full">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight px-4"
                >
                    Ready for your <span className="text-cyan-400">Digital Spotlight?</span>
                </motion.h2>

                <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-block px-10 py-4 rounded-2xl text-lg font-semibold
    bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(0,255,255,0.4)]
    overflow-hidden"
                >
                    Start Your Project
                </motion.a>
            </section>

        </div>
    );
};

export default Portfolio;