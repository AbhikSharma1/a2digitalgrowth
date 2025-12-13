import { motion } from 'framer-motion';
import { Briefcase, DollarSign, MapPin, Code, Server, Zap, ArrowRight, Clock } from 'lucide-react';

// --- Framer Motion Variants ---
const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0 } },
};

const requirementVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
        opacity: 1, 
        x: 0, 
        transition: { delay: i * 0.1, duration: 0.6 } 
    }),
};

const CareerDetail = () => {
    
    // --- Job Specific Data ---
    const job = {
        title: "Senior MERN Stack Developer",
        department: "Development & Engineering",
        salary: "Competitive (Based on Experience)",
        location: "Remote / Hybrid (India)",
        type: "Full-Time",
        description: "A3 Digital Growth is seeking a highly skilled Senior MERN Stack Developer to lead the architecture and development of scalable, high-performance web applications. You will be instrumental in designing and implementing solutions from front-end user interfaces (React) to robust back-end services (Node.js/Express) and database structures (MongoDB).",
        responsibilities: [
            "Lead the design and implementation of new features and microservices within the MERN stack ecosystem.",
            "Write clean, well-tested, and efficient JavaScript/TypeScript code for both the client and server sides.",
            "Architect and manage MongoDB schemas and deployment strategies for high availability and performance.",
            "Collaborate with the Creative team to translate high-fidelity designs (Tailwind/CSS) into responsive user interfaces.",
            "Mentor junior developers and participate in code reviews to ensure quality and adherence to best practices.",
            "Optimize application performance and troubleshoot complex issues across the full stack.",
        ],
        requirements: [
            "5+ years of professional experience in full-stack web development.",
            "Expert-level proficiency in MongoDB, Express.js, React.js, and Node.js (MERN stack).",
            "Strong command over modern state management libraries (e.g., Redux, Context API).",
            "Experience with cloud services (AWS, Google Cloud) and CI/CD pipelines.",
            "Excellent understanding of RESTful APIs, JWT authentication, and security protocols.",
            "Experience working in an Agile/Scrum environment.",
        ]
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24">
            
            {/* 1. JOB HEADER & DETAILS */}
            <header className="relative w-full py-24 px-6 bg-gradient-to-b from-gray-900 to-black border-b border-cyan-500/20">
                <div className="max-w-4xl mx-auto">
                    <motion.p initial="hidden" animate="visible" variants={{ visible: { opacity: 1, transition: { delay: 0.2 } } }} className="text-fuchsia-400 font-bold uppercase mb-2 tracking-widest">
                        {job.department}
                    </motion.p>
                    <motion.h1
                        initial="hidden" animate="visible" variants={headerVariants}
                        className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
                    >
                        {job.title}
                    </motion.h1>
                    
                    {/* Key Info Badges */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4 mt-6">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 font-medium text-sm">
                            <MapPin size={16} /> {job.location}
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 font-medium text-sm">
                            <Clock size={16} /> {job.type}
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 font-medium text-sm">
                            <DollarSign size={16} /> {job.salary}
                        </span>
                    </motion.div>
                </div>
            </header>

            {/* 2. MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 py-20 px-6">
                
                {/* LEFT COLUMN: Responsibilities & Description */}
                <div className="lg:col-span-2">
                    
                    <motion.p initial="hidden" whileInView="visible" variants={headerVariants} viewport={{ once: true }} className="text-gray-300 text-lg mb-10">
                        {job.description}
                    </motion.p>

                    {/* Responsibilities */}
                    <motion.h2 initial="hidden" whileInView="visible" variants={headerVariants} viewport={{ once: true }} className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                        <Briefcase size={24} /> Key Responsibilities
                    </motion.h2>
                    <ul className="space-y-4 list-none pl-0">
                        {job.responsibilities.map((resp, index) => (
                            <motion.li
                                key={index}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                variants={requirementVariants}
                                viewport={{ once: true, amount: 0.5 }}
                                className="flex items-start text-gray-300 border-l-4 border-fuchsia-500/50 pl-3 py-1"
                            >
                                <span className="mr-3 text-fuchsia-400 font-extrabold flex-shrink-0">//</span>
                                {resp}
                            </motion.li>
                        ))}
                    </ul>
                </div>
                
                {/* RIGHT COLUMN: Technical Requirements & Apply Card */}
                <div className="lg:col-span-1">
                    
                    {/* Technical Requirements */}
                    <motion.div initial="hidden" whileInView="visible" variants={headerVariants} viewport={{ once: true }} className="p-8 bg-gray-900 rounded-xl border border-fuchsia-400/50 shadow-xl mb-12">
                        <h3 className="text-2xl font-bold text-fuchsia-400 mb-6 flex items-center gap-3">
                            <Code size={20} /> Required Tech Mastery
                        </h3>
                        <ul className="space-y-3">
                            {job.requirements.map((req, index) => (
                                <motion.li
                                    key={index}
                                    custom={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    variants={requirementVariants}
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="text-sm text-gray-300 flex items-start gap-2"
                                >
                                    <span className="text-cyan-400 font-bold flex-shrink-0">✓</span> {req}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Apply Now Card */}
                    <motion.div initial="hidden" whileInView="visible" variants={headerVariants} viewport={{ once: true }} className="p-8 bg-gradient-to-br from-cyan-900 to-black rounded-xl shadow-2xl border border-cyan-400/50">
                        <h3 className="text-2xl font-bold mb-4">Ready to Lead?</h3>
                        <p className="text-gray-300 mb-6">
                            This role demands MERN expertise and leadership. Click below to submit your application and CV directly.
                        </p>
                        <motion.a
                            href="/contact?role=senior-mern-developer" // Deep link to contact form
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 rounded-xl text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2"
                        >
                            Apply Securely Now <ArrowRight size={20} />
                        </motion.a>
                    </motion.div>

                </div>
            </div>

            {/* 3. FINAL CTA (Consistent) */}
            <section className="relative py-28 text-center text-white overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
                >
                    Not This Role? <span className="text-fuchsia-400">Explore Other Opportunities.</span>
                </motion.h2>

                <motion.a
                    href="/careers" 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-block px-10 py-4 rounded-2xl text-lg font-semibold
    bg-gradient-to-r from-fuchsia-500 to-pink-600 shadow-[0_0_25px_rgba(255,0,255,0.4)]
    overflow-hidden"
                >
                    Back to All Careers
                </motion.a>
            </section>

        </div>
    );
};

export default CareerDetail;