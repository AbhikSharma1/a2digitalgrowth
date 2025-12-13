import { motion } from "framer-motion";
import { ArrowRight, Zap, Code, TrendingUp, Cpu, Server, Film } from "lucide-react";

const servicesData = [
    // DEVELOPMENT & AI
    {
        category: "Development & AI",
        color: "cyan",
        services: [
            { title: "Web Design & Development (MERN)", desc: "High-performance, responsive sites built with the MERN stack and modern UI/UX.", img: "https://cdn-icons-png.flaticon.com/512/906/906324.png" },
            { title: "Software Development", desc: "Custom applications, enterprise tools, and SaaS solutions tailored to your business needs.", img: "https://cdn-icons-png.flaticon.com/512/3103/3103446.png" },
            { title: "AI Works & Automation", desc: "Integrating intelligent systems, automation scripts, and machine learning solutions.", img: "https://cdn-icons-png.flaticon.com/512/8676/8676239.png" },
        ]
    },
    // DIGITAL MARKETING & GROWTH
    {
        category: "Digital Marketing & Growth",
        color: "blue",
        services: [
            { title: "SEO (Search Engine Optimization)", desc: "Organic growth strategy, keyword research, and on-page/off-page technical SEO.", img: "https://cdn-icons-png.flaticon.com/512/4149/4149676.png" },
            { title: "FB & Insta / Google / YouTube Ads", desc: "Targeted, high-converting PPC and social media advertising campaigns.", img: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png" },
            { title: "Social Media Marketing", desc: "Full-cycle social strategy, community management, and audience engagement.", img: "https://cdn-icons-png.flaticon.com/512/1077/1077054.png" },
            { title: "Content Marketing", desc: "Creating valuable, optimized content (blogs, articles, whitepapers) that drives inbound leads.", img: "https://cdn-icons-png.flaticon.com/512/2830/2830252.png" },
            { title: "Lead Generation", desc: "Strategic funnels, landing page optimization, and direct response campaigns.", img: "https://cdn-icons-png.flaticon.com/512/3135/3135804.png" },
        ]
    },
    // CREATIVE & DESIGN
    {
        category: "Creative & Design",
        color: "cyan",
        services: [
            { title: "Graphics Designing", desc: "Complete visual branding, style guides, and creative asset production.", img: "https://cdn-icons-png.flaticon.com/512/1875/1875685.png" },
            { title: "Advertisement Design", desc: "High-impact visual ads optimized for various platforms and conversion goals.", img: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png" },
            { title: "Banner | Poster Design", desc: "Stunning digital and print-ready visuals for promotions and events.", img: "https://cdn-icons-png.flaticon.com/512/3106/3106399.png" },
            { title: "All Cards Design", desc: "Business cards, digital product cards, loyalty cards, and promotional materials.", img: "https://cdn-icons-png.flaticon.com/512/612/612841.png" },
            { title: "Logo Designing", desc: "Crafting unique, memorable brand identities and professional logos.", img: "https://cdn-icons-png.flaticon.com/512/3356/3356877.png" },
            { title: "Video Editing", desc: "Professional cuts, sound design, color grading, and motion graphics for various platforms.", img: "https://cdn-icons-png.flaticon.com/512/2920/2920293.png" },
            { title: "VFX Video Editing", desc: "Advanced visual effects, compositing, and cinematic enhancement for impactful content.", img: "https://cdn-icons-png.flaticon.com/512/4743/4743022.png" },
        ]
    }
];

// Replicating the Service Card Style from Home.js 
const ServiceCard = ({ service, color, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ scale: 1.05, rotate: 0.5 }} // Subtle rotation on hover
        className={`p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black 
                    border border-white/10 hover:border-cyan-400/50 
                    shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] 
                    transition relative overflow-hidden h-full flex flex-col justify-between`}
    >
        {/* Glow Effect (Matching Home Page) */}
        <div className="absolute  inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-2xl opacity-0 hover:opacity-100 transition duration-500"></div>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4">
            <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]" 
            />
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold text-center mb-3 text-cyan-300`}>
            {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-center mb-6 px-2 flex-grow">
            {service.desc}
        </p>

        {/* Learn More Button */}
        <div className="flex justify-center mt-auto">
            <a
                href={`/services/${service.title.toLowerCase().replace(/\s/g, '-')}`}
                className="px-4 py-2 text-sm rounded-xl border border-cyan-400/40 text-cyan-300
                            hover:bg-cyan-400/20 transition cursor-pointer flex items-center gap-2"
            >
                View Details <ArrowRight size={14} />
            </a>
        </div>
    </motion.div>
);


const TechnologyHighlight = () => (
    <motion.div 
        className="max-w-7xl mx-auto py-12 sm:py-20 px-4 sm:px-6 w-full overflow-x-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
    >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-12">
            The <span className="text-fuchsia-400">Technology</span> That Powers Your Growth
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            {/* MERN Stack Highlight */}
            <motion.div 
                className="p-8 bg-gray-800/70 rounded-xl border border-fuchsia-400/30 hover:border-fuchsia-400 transition"
                whileHover={{ y: -5 }}
            >
                <Code className="w-12 h-12 text-fuchsia-400 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,0,255,0.4)]" />
                <h3 className="text-2xl font-bold mb-2 text-fuchsia-300">MERN Ecosystem</h3>
                <p className="text-gray-400">Full-stack JavaScript development for speed and scalability (MongoDB, Express, React, Node.js).</p>
                <div className="mt-4 text-sm text-gray-500">Node, React, Tailwind, Redux.</div>
            </motion.div>

            {/* Creative Software Highlight */}
            <motion.div 
                className="p-8 bg-gray-800/70 rounded-xl border border-cyan-400/30 hover:border-cyan-400 transition"
                whileHover={{ y: -5 }}
            >
                <Film className="w-12 h-12 text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]" />
                <h3 className="text-2xl font-bold mb-2 text-cyan-300">Creative Mastery</h3>
                <p className="text-gray-400">Industry-standard tools for professional video, graphics, and VFX production.</p>
                <div className="mt-4 text-sm text-gray-500">Premiere Pro, Photoshop, After Effects, DaVinci, Figma.</div>
            </motion.div>

            {/* Marketing Tools Highlight */}
            <motion.div 
                className="p-8 bg-gray-800/70 rounded-xl border border-blue-400/30 hover:border-blue-400 transition"
                whileHover={{ y: -5 }}
            >
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(0,0,255,0.4)]" />
                <h3 className="text-2xl font-bold mb-2 text-blue-300">Growth Platforms</h3>
                <p className="text-gray-400">Data-driven marketing using official platforms for maximum ad ROI and visibility.</p>
                <div className="mt-4 text-sm text-gray-500">Google Ads, Meta Ads (FB/IG), SEO Tools, HubSpot/CRM.</div>
            </motion.div>
        </div>
    </motion.div>
);

// Growth Methodology Timeline
const GrowthMethodology = () => (
    <motion.div 
        className="max-w-6xl mx-auto py-12 sm:py-20 px-4 sm:px-6 w-full overflow-x-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
    >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-12">
            Our <span className="text-cyan-400">4-Step Growth</span> Methodology
        </h2>
        
        {/* === RESPONSIVE TIMELINE GRID ADJUSTMENT === */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-4 items-start">
            
            {/* Timeline Line - Vertical on Mobile, Horizontal on Desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-700 z-0 md:hidden"></div>
            <div className="absolute top-10 left-0 right-0 h-1 bg-gray-700 z-0 hidden md:block"></div>

            {[
                { step: 1, title: "DISCOVER", desc: "Deep dive into your goals, audience, and market landscape.", icon: Cpu, color: "fuchsia" },
                { step: 2, title: "ENGINEER", desc: "Develop the solution: MERN code, creative assets, and ad campaigns.", icon: Code, color: "cyan" },
                { step: 3, title: "DEPLOY & LAUNCH", desc: "Flawless technical launch, ad deployment, and SEO activation.", icon: Zap, color: "blue" },
                { step: 4, title: "SCALE & OPTIMIZE", desc: "Continuous monitoring, A/B testing, and strategy refinement for growth.", icon: TrendingUp, color: "lime" },
            ].map((item, i) => (
                <motion.div 
                    key={i} 
                    className="w-full p-4 z-10 bg-black md:bg-transparent rounded-lg md:rounded-none" // Added bg-black for Z-index visibility on mobile timeline
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.2 }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-900 border-4 border-${item.color}-500 shadow-lg shadow-${item.color}-500/40`}>
                        <item.icon className={`w-8 h-8 text-${item.color}-400`} />
                    </div>
                    <p className={`text-sm font-bold text-${item.color}-400 mb-1`}>STEP {item.step}</p>
                    <h3 className="text-xl font-extrabold mb-2 text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
            ))}
        </div>
    </motion.div>
);


const Services = () => {
    return (
        <div className="pt-20 bg-black min-h-screen text-white w-full overflow-x-hidden">

            {/* ================= HERO/TITLE SECTION ================= */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black">
                {/* Background Glows (unchanged) */}
                <div className="absolute inset-0 -z-10">
                    <div className="w-96 h-96 bg-cyan-500/15 blur-[180px] rounded-full absolute top-10 left-10 animate-pulse-slow"></div>
                    <div className="w-96 h-96 bg-blue-600/15 blur-[180px] rounded-full absolute bottom-10 right-10 animate-pulse-slow-reverse"></div>
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


                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ 
                        opacity: { duration: 1 },
                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                >
                    The <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        A3 Digital Growth
                    </span> Ecosystem 🚀
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl px-4"
                >
                    A full-spectrum service hub, engineered for rapid growth and peak digital performance.
                </motion.p>
            </section>
            
            {/* ================= TECHNOLOGY HIGHLIGHT SECTION ================= */}
            <TechnologyHighlight />

            {/* ================= GROWTH METHODOLOGY SECTION (RESPONSIVE) ================= */}
            <GrowthMethodology />
            
            {/* ================= SERVICES CATEGORIES GRID (RESPONSIVE) ================= */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full overflow-x-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 sm:mb-16 text-white"
                >
                    <span className="text-fuchsia-400">Explore</span> Our Capabilities
                </motion.h2>

                {servicesData.map((category, index) => (
                    <section 
                        key={index} 
                        className="w-full mb-20"
                    >
                        {/* Category Header */}
                        <motion.h3
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className={`text-3xl font-extrabold text-white mb-10 border-b-2 border-${category.color}-400/50 pb-3 inline-block`}
                        >
                            <span className={`text-${category.color}-400`}>{category.category}</span>
                        </motion.h3>

                        {/* Service Cards Grid - Uses existing responsive classes (1-2-3 cols) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                            {category.services.map((service, i) => (
                                <ServiceCard 
                                    key={i} 
                                    service={service} 
                                    color={category.color} 
                                    index={i}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>


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
                    Ready to <span className="text-cyan-400">Launch Your Next Project?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-gray-300 mb-10 max-w-2xl mx-auto text-base sm:text-lg px-4"
                >
                    Let's discuss how A3 Digital Growth's unified approach can deliver rapid and measurable growth.
                </motion.p>

                {/* CTA BUTTON (Consistent with Home Page) */}
                <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-block px-10 py-4 rounded-2xl text-lg font-semibold
    bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(0,255,255,0.4)]
    overflow-hidden"
                >
                    Start Collaboration
                </motion.a>
            </section>
        </div>
    );
};

export default Services;