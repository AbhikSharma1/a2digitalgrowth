import { motion } from "framer-motion";
import { Code, Users, TrendingUp, Zap, Sparkles, Server, Monitor, Film, Palette } from "lucide-react";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.8, 
            ease: "easeOut" 
        } 
    },
};

const About = () => {
    return (
        <div className="pt-20 bg-black min-h-screen text-white w-full overflow-x-hidden">

            <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black">
                
                {/* Animated Background Glow */}
                <div className="absolute inset-0 -z-10">
                    <div className="w-72 h-72 bg-cyan-500/20 blur-[140px] rounded-full absolute top-10 left-10"></div>
                    <div className="w-72 h-72 bg-blue-600/20 blur-[140px] rounded-full absolute bottom-10 right-10"></div>
                </div>

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



                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                    className="relative z-20"
                >
                    <motion.h1
                        variants={sectionVariants}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                    >
                        Engineering Digital <br />
                        <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                            Success Stories 
                        </span> 🚀
                    </motion.h1>

                    <motion.p
                        variants={sectionVariants}
                        className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl px-4"
                    >
                        Yes we're a young company but you can trust, At A3 Digital Growth 🚀, we are more than an agency; we are the **architects** of your digital growth, blending MERN technology with marketing mastery. 

                    </motion.p>
                </motion.div>
            </section>

            {/* ================= OUR CORE PHILOSOPHY================= */}
            <motion.section 
                className="py-12 sm:py-24 px-4 sm:px-6 bg-black w-full overflow-x-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
                    
                    {[
                        { icon: Users, title: "Collaborative Mastery", desc: "A unified team of MERN developers, designers, and strategists working as one extension of your brand." },
                        { icon: TrendingUp, title: "Impact-Driven Results", desc: "Our focus is strictly on measurable growth: increased SEO rankings, higher CTRs, and improved conversion." },
                        { icon: Zap, title: "Future-Proof Technology", desc: "Building scalable and high-performance solutions primarily using the modern, robust MERN stack." },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="p-8 rounded-2xl bg-black border border-white/10 shadow-lg hover:border-fuchsia-400/50 hover:shadow-[0_0_20px_rgba(255,0,255,0.4)] transition"
                            whileHover={{ scale: 1.05 }}
                        >
                            <item.icon className="w-12 h-12 text-fuchsia-400 mx-auto mb-4 drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]" />
                            <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ================= TECHNICAL MASTERY SECTION ================= */}
            <motion.section 
                className="py-12 sm:py-24 px-4 sm:px-6 bg-black w-full overflow-x-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-12 text-center">
                        Our <span className="text-cyan-400">Tool Stack</span> and Expertise
                    </h2>
                    
                    {/* Grid for Development and Creative Tools */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        
                        {/* LEFT: WEB & SOFTWARE DEVELOPMENT */}
                        <div className="p-8 bg-gray-900/70 rounded-2xl border border-cyan-500/30">
                            <h3 className="flex items-center gap-3 text-3xl font-bold mb-6 text-cyan-400">
                                <Monitor className="w-8 h-8" /> Development Systems
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                We leverage the power of the unified **MERN stack** for full-cycle development, ensuring fast, scalable, and modern applications. Our commitment is to robust, future-proof code.
                            </p>
                            
                            {/* Development Tools List */}
                            <div className="space-y-4">
                                {[
                                    { name: "MERN Stack", tools: "MongoDB, Express.js, React, Node.js", icon: Code },
                                    { name: "Front-End", tools: "Tailwind CSS, Redux, React Router", icon: Sparkles },
                                    { name: "Back-End/API", tools: "RESTful APIs, JWT, Passport.js", icon: Server },
                                ].map((tech, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="flex items-start gap-4 p-4 border-l-4 border-cyan-500 bg-gray-900 rounded-md"
                                        whileHover={{ x: 5 }}
                                    >
                                        <tech.icon className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="text-xl font-semibold text-white">{tech.name}</h4>
                                            <p className="text-gray-400 text-sm">{tech.tools}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: CREATIVE SERVICES */}
                        <div className="p-8 bg-gray-900/70 rounded-2xl border border-fuchsia-500/30">
                            <h3 className="flex items-center gap-3 text-3xl font-bold mb-6 text-fuchsia-400">
                                <Film className="w-8 h-8" /> Creative Workflows
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                Our creative team utilizes industry-leading software to deliver high-quality graphics, stunning videos, and click-optimized thumbnails. Precision and artistic flair are guaranteed.
                            </p>
                            
                            {/* Creative Tools List */}
                            <div className="space-y-4">
                                {[
                                    { name: "Video Editing", tools: "**Adobe Premiere Pro**, CapCut, DaVinci Resolve, Final Cut Pro (as required)", icon: Film },
                                    { name: "Graphics Design", tools: "**Adobe Photoshop**, Adobe Illustrator, Figma, Canva (for social media)", icon: Palette },
                                    { name: "Motion/VFX", tools: "Adobe After Effects, specialized 3D tools", icon: Zap },
                                ].map((tool, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="flex items-start gap-4 p-4 border-l-4 border-fuchsia-500 bg-gray-900 rounded-md"
                                        whileHover={{ x: 5 }}
                                    >
                                        <tool.icon className="w-6 h-6 text-fuchsia-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="text-xl font-semibold text-white">{tool.name}</h4>
                                            <p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: tool.tools }} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ================= TEAM INTRODUCTION================= */}
             <motion.section 
                className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-tr from-black via-gray-900 to-black text-white text-center w-full overflow-x-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                        Meet the <span className="text-fuchsia-400">A3 Squad</span>
                    </h2>
                    <p className="text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-base sm:text-lg px-4">
                        We are a collective of driven specialists who are passionate about delivering excellence in every digital domain.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Placeholder Team Cards */}
                        {[
                            { title: "Developers", desc: "MERN Stack Experts", color: "cyan" },
                            { title: "Designers", desc: "Graphics & Video Specialists", color: "blue" },
                            { title: "Marketers", desc: "SEO & Paid Promotion Gurus", color: "fuchsia" },
                            { title: "Strategists", desc: "Project & Growth Planning", color: "lime" },
                        ].map((member, i) => (
                            <motion.div 
                                key={i}
                                className={`p-6 rounded-xl bg-gray-900 border border-white/10 transition shadow-lg hover:shadow-xl hover:border-${member.color}-400/50`}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className={`text-xl font-bold mb-1 text-${member.color}-400`}>{member.title}</h3>
                                <p className="text-gray-400 text-sm">{member.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ================= FINAL CTA ================= */}
            <section className="relative py-16 sm:py-28 text-center text-white overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black w-full">
                
                {/* Holographic Background Effects (Kept for consistency) */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full top-0 left-1/4"></div>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight px-4"
                >
                    Let's Build the Future of <span className="text-cyan-400">Your Brand</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-gray-300 mb-10 max-w-2xl mx-auto text-base sm:text-lg px-4"
                >
                    Ready to partner with a team that delivers both creative vision and technical excellence?
                </motion.p>

                {/* CTA BUTTON */}
                <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-block px-10 py-4 rounded-2xl text-lg font-semibold
    bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(0,255,255,0.4)]
    overflow-hidden"
                >
                    Get a Free Consultation
                </motion.a>
            </section>
        </div>
    );
};

// Global styles (keyframes) should be handled elsewhere, but noted here for completeness
const GlobalStyles = () => (
    <style jsx global>{`
        /* Include necessary global styles for animations (like pulse-slow and shine) */
    `}</style>
);

export default About;