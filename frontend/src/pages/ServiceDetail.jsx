import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Users, Star } from 'lucide-react';

// Service details data
const serviceDetails = {
    'web-design-&-development-(mern)': {
        title: "Web Design & Development (MERN)",
        category: "Development & AI",
        description: "Transform your digital presence with cutting-edge MERN stack development. We create high-performance, responsive websites that drive engagement and conversions.",
        features: [
            "Custom React.js frontend development",
            "Node.js and Express.js backend architecture",
            "MongoDB database design and optimization",
            "Responsive design for all devices",
            "SEO-optimized code structure",
            "Performance optimization and caching"
        ],
        process: [
            "Requirements analysis and planning",
            "UI/UX design and prototyping",
            "Frontend development with React",
            "Backend API development",
            "Database integration and testing",
            "Deployment and maintenance"
        ],
        deliverables: [
            "Fully functional web application",
            "Source code and documentation",
            "Admin panel (if required)",
            "Performance optimization report",
            "3 months free maintenance",
            "Training and handover session"
        ],
        timeline: "4-8 weeks",
        price: "Starting from $2,500"
    },
    'software-development': {
        title: "Software Development",
        category: "Development & AI",
        description: "Custom software solutions tailored to your business needs. From enterprise applications to SaaS platforms, we build scalable and robust software.",
        features: [
            "Custom application development",
            "Enterprise software solutions",
            "SaaS platform development",
            "API development and integration",
            "Cloud-native architecture",
            "Scalable and secure solutions"
        ],
        process: [
            "Business analysis and requirements",
            "System architecture design",
            "Development and coding",
            "Quality assurance testing",
            "Deployment and integration",
            "Support and maintenance"
        ],
        deliverables: [
            "Complete software solution",
            "Technical documentation",
            "User manuals and guides",
            "Testing reports",
            "Deployment assistance",
            "Ongoing support package"
        ],
        timeline: "8-16 weeks",
        price: "Starting from $5,000"
    },
    'ai-works-&-automation': {
        title: "AI Works & Automation",
        category: "Development & AI",
        description: "Leverage artificial intelligence and automation to streamline your business processes and gain competitive advantages.",
        features: [
            "Machine learning model development",
            "Process automation solutions",
            "Chatbot and AI assistant development",
            "Data analysis and insights",
            "Workflow automation",
            "AI integration services"
        ],
        process: [
            "AI strategy consultation",
            "Data collection and preparation",
            "Model development and training",
            "Integration and testing",
            "Deployment and monitoring",
            "Optimization and maintenance"
        ],
        deliverables: [
            "AI-powered solution",
            "Model documentation",
            "Integration guides",
            "Performance metrics",
            "Training materials",
            "Ongoing optimization"
        ],
        timeline: "6-12 weeks",
        price: "Starting from $3,500"
    },
    'seo-(search-engine-optimization)': {
        title: "SEO (Search Engine Optimization)",
        category: "Digital Marketing & Growth",
        description: "Boost your organic visibility and drive qualified traffic with our comprehensive SEO strategies and technical optimization.",
        features: [
            "Keyword research and analysis",
            "On-page SEO optimization",
            "Technical SEO audits",
            "Content optimization",
            "Link building strategies",
            "Local SEO optimization"
        ],
        process: [
            "SEO audit and analysis",
            "Keyword research and strategy",
            "On-page optimization",
            "Content creation and optimization",
            "Link building campaigns",
            "Monitoring and reporting"
        ],
        deliverables: [
            "SEO strategy document",
            "Optimized website content",
            "Technical SEO improvements",
            "Monthly performance reports",
            "Keyword ranking reports",
            "Ongoing optimization recommendations"
        ],
        timeline: "3-6 months",
        price: "Starting from $1,200/month"
    },
    'fb-&-insta-/-google-/-youtube-ads': {
        title: "FB & Insta / Google / YouTube Ads",
        category: "Digital Marketing & Growth",
        description: "Targeted, high-converting PPC and social media advertising campaigns that maximize your ROI and reach your ideal customers.",
        features: [
            "Facebook & Instagram ad campaigns",
            "Google Ads (Search & Display)",
            "YouTube advertising campaigns",
            "Audience targeting and segmentation",
            "A/B testing and optimization",
            "Conversion tracking and analytics"
        ],
        process: [
            "Campaign strategy development",
            "Audience research and targeting",
            "Ad creative development",
            "Campaign setup and launch",
            "Performance monitoring",
            "Optimization and scaling"
        ],
        deliverables: [
            "Campaign strategy document",
            "Ad creatives and copy",
            "Targeting setup",
            "Performance dashboards",
            "Monthly optimization reports",
            "ROI analysis and recommendations"
        ],
        timeline: "2-4 weeks setup + ongoing",
        price: "Starting from $800/month + ad spend"
    },
    'social-media-marketing': {
        title: "Social Media Marketing",
        category: "Digital Marketing & Growth",
        description: "Full-cycle social strategy, community management, and audience engagement to build your brand presence across all platforms.",
        features: [
            "Social media strategy development",
            "Content calendar creation",
            "Community management",
            "Influencer collaboration",
            "Social media analytics",
            "Brand reputation management"
        ],
        process: [
            "Social media audit",
            "Strategy and content planning",
            "Content creation and scheduling",
            "Community engagement",
            "Performance tracking",
            "Strategy refinement"
        ],
        deliverables: [
            "Social media strategy",
            "Monthly content calendar",
            "Branded social media graphics",
            "Engagement reports",
            "Growth analytics",
            "Community management"
        ],
        timeline: "Ongoing monthly service",
        price: "Starting from $600/month"
    },
    'content-marketing': {
        title: "Content Marketing",
        category: "Digital Marketing & Growth",
        description: "Creating valuable, optimized content (blogs, articles, whitepapers) that drives inbound leads and establishes thought leadership.",
        features: [
            "Content strategy development",
            "Blog writing and optimization",
            "Whitepaper and ebook creation",
            "SEO content optimization",
            "Content distribution strategy",
            "Performance analytics"
        ],
        process: [
            "Content audit and strategy",
            "Editorial calendar creation",
            "Content research and writing",
            "SEO optimization",
            "Publishing and distribution",
            "Performance analysis"
        ],
        deliverables: [
            "Content marketing strategy",
            "Monthly blog posts",
            "SEO-optimized articles",
            "Content performance reports",
            "Lead generation content",
            "Distribution plan"
        ],
        timeline: "Ongoing monthly service",
        price: "Starting from $900/month"
    },
    'lead-generation': {
        title: "Lead Generation",
        category: "Digital Marketing & Growth",
        description: "Strategic funnels, landing page optimization, and direct response campaigns designed to convert visitors into qualified leads.",
        features: [
            "Lead magnet creation",
            "Landing page optimization",
            "Email marketing funnels",
            "Lead scoring systems",
            "CRM integration",
            "Conversion rate optimization"
        ],
        process: [
            "Lead generation audit",
            "Funnel strategy development",
            "Landing page creation",
            "Email sequence setup",
            "Campaign launch",
            "Optimization and scaling"
        ],
        deliverables: [
            "Lead generation strategy",
            "Optimized landing pages",
            "Email marketing sequences",
            "Lead tracking system",
            "Conversion reports",
            "ROI analysis"
        ],
        timeline: "4-6 weeks setup + ongoing",
        price: "Starting from $1,500/month"
    },
    'graphics-designing': {
        title: "Graphics Designing",
        category: "Creative & Design",
        description: "Complete visual branding, style guides, and creative asset production that captures attention and communicates your brand message effectively.",
        features: [
            "Brand identity design",
            "Marketing collateral design",
            "Digital and print graphics",
            "Social media graphics",
            "Infographic design",
            "Packaging design"
        ],
        process: [
            "Brand discovery and research",
            "Concept development",
            "Design creation and refinement",
            "Client feedback and revisions",
            "Final design delivery",
            "Brand guidelines creation"
        ],
        deliverables: [
            "Final design files (AI, PSD, PNG, JPG)",
            "Brand guidelines document",
            "Multiple format variations",
            "Print-ready files",
            "Web-optimized versions",
            "Source files and assets"
        ],
        timeline: "2-4 weeks",
        price: "Starting from $500"
    },
    'advertisement-design': {
        title: "Advertisement Design",
        category: "Creative & Design",
        description: "High-impact visual ads optimized for various platforms and conversion goals, designed to capture attention and drive action.",
        features: [
            "Digital ad design (Facebook, Google, etc.)",
            "Print advertisement design",
            "Banner and display ads",
            "A/B testing variations",
            "Platform-specific optimization",
            "Conversion-focused design"
        ],
        process: [
            "Campaign objective analysis",
            "Creative concept development",
            "Design creation and variations",
            "Platform optimization",
            "Testing and refinement",
            "Final delivery"
        ],
        deliverables: [
            "Multiple ad variations",
            "Platform-specific formats",
            "A/B testing versions",
            "Source files",
            "Usage guidelines",
            "Performance recommendations"
        ],
        timeline: "1-2 weeks",
        price: "Starting from $300"
    },
    'banner-|-poster-design': {
        title: "Banner | Poster Design",
        category: "Creative & Design",
        description: "Stunning digital and print-ready visuals for promotions and events that grab attention and communicate your message effectively.",
        features: [
            "Event poster design",
            "Promotional banner creation",
            "Digital display graphics",
            "Print-ready artwork",
            "Multiple size variations",
            "Brand-consistent design"
        ],
        process: [
            "Brief and requirements gathering",
            "Concept and layout development",
            "Design creation",
            "Revisions and refinement",
            "Final artwork preparation",
            "Multi-format delivery"
        ],
        deliverables: [
            "High-resolution poster/banner files",
            "Multiple format variations",
            "Print-ready files (CMYK)",
            "Web-optimized versions (RGB)",
            "Source files",
            "Printing specifications"
        ],
        timeline: "3-5 days",
        price: "Starting from $150"
    },
    'all-cards-design': {
        title: "All Cards Design",
        category: "Creative & Design",
        description: "Business cards, digital product cards, loyalty cards, and promotional materials designed to make a lasting impression.",
        features: [
            "Business card design",
            "Digital product cards",
            "Loyalty card design",
            "Gift card creation",
            "ID card design",
            "Membership card design"
        ],
        process: [
            "Card type and requirements analysis",
            "Design concept development",
            "Layout and typography",
            "Brand integration",
            "Print specifications",
            "Final delivery"
        ],
        deliverables: [
            "Print-ready card designs",
            "Digital versions",
            "Multiple format files",
            "Printing guidelines",
            "Source files",
            "Brand variations"
        ],
        timeline: "2-4 days",
        price: "Starting from $100"
    },
    'logo-designing': {
        title: "Logo Designing",
        category: "Creative & Design",
        description: "Crafting unique, memorable brand identities and professional logos that represent your business values and vision.",
        features: [
            "Custom logo design",
            "Brand identity development",
            "Multiple concept variations",
            "Scalable vector formats",
            "Color and monochrome versions",
            "Brand guidelines creation"
        ],
        process: [
            "Brand discovery session",
            "Research and inspiration",
            "Concept sketching",
            "Digital design creation",
            "Refinement and finalization",
            "Brand guidelines delivery"
        ],
        deliverables: [
            "Final logo in multiple formats",
            "Vector files (AI, EPS, SVG)",
            "High-resolution PNG/JPG",
            "Brand color palette",
            "Logo usage guidelines",
            "Trademark-ready files"
        ],
        timeline: "1-2 weeks",
        price: "Starting from $400"
    },
    'video-editing': {
        title: "Video Editing",
        category: "Creative & Design",
        description: "Professional cuts, sound design, color grading, and motion graphics for various platforms that engage and convert viewers.",
        features: [
            "Professional video editing",
            "Color correction and grading",
            "Audio enhancement and mixing",
            "Motion graphics integration",
            "Multi-format delivery",
            "Social media optimization"
        ],
        process: [
            "Content review and planning",
            "Rough cut creation",
            "Fine editing and effects",
            "Audio synchronization",
            "Color grading and finishing",
            "Final delivery and formats"
        ],
        deliverables: [
            "Edited video in multiple formats",
            "Social media versions",
            "Raw project files",
            "Audio tracks (separate)",
            "Thumbnail designs",
            "Video optimization report"
        ],
        timeline: "1-3 weeks",
        price: "Starting from $300"
    },
    'vfx-video-editing': {
        title: "VFX Video Editing",
        category: "Creative & Design",
        description: "Advanced visual effects, compositing, and cinematic enhancement for impactful content that stands out from the competition.",
        features: [
            "Advanced visual effects",
            "3D compositing and animation",
            "Green screen and chroma keying",
            "Motion tracking and stabilization",
            "Particle effects and simulations",
            "Cinematic color grading"
        ],
        process: [
            "VFX planning and storyboarding",
            "Footage analysis and preparation",
            "Effects creation and compositing",
            "3D integration and animation",
            "Color grading and finishing",
            "Final rendering and delivery"
        ],
        deliverables: [
            "VFX-enhanced video",
            "Multiple resolution versions",
            "Behind-the-scenes breakdown",
            "Project files and assets",
            "Render settings documentation",
            "Future editing compatibility"
        ],
        timeline: "2-6 weeks",
        price: "Starting from $800"
    }
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const service = serviceDetails[slug];

    if (!service) {
        return (
            <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <p className="text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
                    <Link to="/services" className="text-cyan-400 hover:text-cyan-300 flex items-center justify-center">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24">
            <div className="max-w-4xl mx-auto px-6 py-12">
                
                {/* Back Button */}
                <Link to="/services" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to All Services
                </Link>

                {/* Service Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-900 rounded-xl p-8 mb-8 border border-white/10"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                            {service.category}
                        </span>
                        <div className="flex items-center text-gray-300">
                            <Clock size={16} className="mr-1" />
                            {service.timeline}
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">{service.title}</h1>
                    <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="text-2xl font-bold text-cyan-400">{service.price}</div>
                        <div className="flex items-center text-yellow-400">
                            <Star size={16} className="mr-1 fill-current" />
                            <span className="text-sm">Premium Service</span>
                        </div>
                    </div>
                </motion.div>

                {/* Features */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">What's Included</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                            <div key={index} className="flex items-start text-gray-300">
                                <CheckCircle size={18} className="mr-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Process */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Our Process</h2>
                    <div className="space-y-3">
                        {service.process.map((step, index) => (
                            <div key={index} className="flex items-start text-gray-300">
                                <div className="w-6 h-6 bg-fuchsia-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                                    {index + 1}
                                </div>
                                {step}
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Deliverables */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">What You'll Receive</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                        {service.deliverables.map((deliverable, index) => (
                            <div key={index} className="flex items-start text-gray-300">
                                <CheckCircle size={18} className="mr-3 mt-0.5 text-lime-400 flex-shrink-0" />
                                {deliverable}
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 border border-white/10"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                    <p className="text-gray-300 mb-6">Let's discuss your project and create something amazing together.</p>
                    <Link
                        to={`/services/${slug}/request`}
                        className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition duration-300"
                    >
                        Request This Service
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetail;