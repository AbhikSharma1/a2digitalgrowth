import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Home = () => {
    return (
        <div className="pt-20 bg-black min-h-screen w-full overflow-x-hidden">

            {/* ================= Home Page ka section ================= */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-gradient-to-br from-black via-gray-900 to-black">

                {/* background glow hoga */}
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


                {/* home ka title */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ 
                        opacity: { duration: 1 },
                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] max-w-full"
                >
                    Elevating Brands Through <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        Creativity & Technology
                    </span> 🚀
                </motion.h1>

                {/* Home Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-300 mt-6 max-w-2xl text-base sm:text-lg px-4"
                >
                    A3 Digital Growth specializes in advertisement, SEO, designing, editing,
                    development and digital promotions that help your brand grow faster.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-10 px-4"
                >
                    <a
                        href="/services"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg flex items-center gap-2 hover:scale-105 transition"
                    >
                        Explore Services <ArrowRight size={18} />
                    </a>

                    <a
                        href="/contact"
                        className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition"
                    >
                        Contact Us
                    </a>
                </motion.div>
            </section>

            {/* ================= service wala section ================= */}
            <section className="py-12 sm:py-20 px-4 sm:px-6 bg-black text-white w-full overflow-x-hidden">
                <div className="max-w-7xl mx-auto">

                    <h2 className="text-4xl font-bold text-center mb-14">
                        Our <span className="text-cyan-400">Expert Services</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">

                        {[
                            {
                                title: "Advertisement & Paid Promotions",
                                desc: "Maximize reach with targeted social media ads, PPC campaigns and impactful brand promotions.",
                                img: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png",
                            },
                            {
                                title: "SEO & Digital Marketing",
                                desc: "Increase visibility, generate leads and grow organically with our smart SEO & marketing strategies.",
                                img: "https://cdn-icons-png.flaticon.com/512/4149/4149676.png",
                            },
                            {
                                title: "Graphics Designing",
                                desc: "Eye-catching designs, posters, business branding and creatives tailored to your style.",
                                img: "https://cdn-icons-png.flaticon.com/512/1875/1875685.png",
                            },
                            {
                                title: "Video Editing & Thumbnails",
                                desc: "Professional video editing, cinematic cuts, thumbnails that boost clicks & engagement.",
                                img: "https://cdn-icons-png.flaticon.com/512/2920/2920293.png",
                            },
                            {
                                title: "Website Development",
                                desc: "High-performance websites built using React, Node, Tailwind, and modern UI/UX principles.",
                                img: "https://cdn-icons-png.flaticon.com/512/906/906324.png",
                            },
                            {
                                title: "Software & App Development",
                                desc: "Custom software, mobile apps, CRM systems and tools for your business workflow.",
                                img: "https://cdn-icons-png.flaticon.com/512/3103/3103446.png",
                            },
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.08, rotate: 1 }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black 
          border border-white/10 hover:border-cyan-400/50 
          shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] 
          transition relative overflow-hidden"
                            >

                                {/* Glow wla Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-2xl opacity-0 hover:opacity-100 transition"></div>

                                {/* Icon */}
                                <div className="w-20 h-20 mx-auto mb-4">
                                    <img src={service.img} alt="icon" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-center mb-3 text-cyan-300">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-300 text-center mb-4 px-2">
                                    {service.desc}
                                </p>

                                {/* Learn More Button */}
                                <div className="flex justify-center mt-4">
                                    <a
                                        href="/services"
                                        className="px-4 py-2 text-sm rounded-xl border border-cyan-400/40 text-cyan-300
              hover:bg-cyan-400/20 hover:scale-105 transition cursor-pointer"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ================= About wala section ================= */}
            <section className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-tr from-black via-gray-900 to-black text-white w-full overflow-x-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            About <span className="text-cyan-400">A3 Digital Growth</span>
                        </h2>

                        <p className="text-gray-300 leading-relaxed mb-6">
                            A3 Digital Growth is a futuristic digital branding agency that blends
                            <span className="text-cyan-300"> creativity, technology, AI and strategic design </span>
                            to build brands that speak, influence and convert.
                        </p>

                        <p className="text-gray-300 leading-relaxed mb-8">
                            With a highly skilled team of designers, editors, developers and
                            marketing experts, we deliver world-class solutions that empower
                            businesses to grow **faster, smarter and louder** in today's competitive digital age.
                        </p>

                        {/* BRAND HIGHLIGHTS */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
                            {[
                                { number: "30+", label: "Brands Served" },
                                { number: "10+", label: "Web Projects" },
                                { number: "200+", label: "Videos Edited" },
                                { number: "1+ Years", label: "Industry Experience" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1 }}
                                    className="p-4 rounded-xl bg-gray-900 border border-white/10
            hover:border-cyan-400/40 transition shadow-lg"
                                >
                                    <h3 className="text-2xl font-bold text-cyan-400">{item.number}</h3>
                                    <p className="text-gray-300 text-sm">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* BUTTON */}
                        <a
                            href="/about"
                            className="inline-block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r
        from-cyan-500 to-blue-600 text-white font-semibold shadow-lg 
        hover:scale-105 transition"
                        >
                            Learn More
                        </a>
                    </motion.div>

                    {/* Right img with effect */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Glow Effects */}
                        <div className="absolute w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full -top-10 -left-10"></div>
                        <div className="absolute w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full bottom-0 right-0"></div>

                        {/* Main Image */}
                        <div className="w-full h-80 rounded-2xl overflow-hidden border border-white/10 relative shadow-xl">
                            <img
                                src="https://img.goodfon.com/wallpaper/big/0/b7/venom-venom-simbiot-chiornyi-fon-glaz.webp"
                                alt="Team Work"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating Logos */}
                        <motion.img
                            src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
                            className="w-14 absolute top-6 right-8 opacity-80 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        />

                        <motion.img
                            src="https://cdn-icons-png.flaticon.com/128/919/919826.png"
                            className="w-14 absolute bottom-10 left-6 opacity-80 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        />

                        <motion.img
                            src="https://cdn-icons-png.flaticon.com/128/732/732212.png"
                            className="w-14 absolute top-28 -left-6 opacity-80 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        />
                    </motion.div>
                </div>

                {/* CLIENT LOGOS */}
                <div className="max-w-7xl mx-auto mt-20">
                    <h3 className="text-center text-lg text-gray-400 mb-6">
                        Trusted by businesses across India
                    </h3>

                    <div className="flex flex-wrap justify-center gap-10 opacity-80">
                        {[
                            "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
                            "https://cdn-icons-png.flaticon.com/512/1946/1946433.png",
                            "https://cdn-icons-png.flaticon.com/512/5969/5969052.png",
                            "https://cdn-icons-png.flaticon.com/512/5968/5968398.png",
                        ].map((logo, i) => (
                            <motion.img
                                key={i}
                                src={logo}
                                className="w-16 hover:opacity-100 transition"
                                whileHover={{ scale: 1.2 }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-16 sm:py-28 text-center text-white overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black w-full">

                {/* Holographic Background Effects */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full top-0 left-1/4"></div>
                    <div className="absolute w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full bottom-0 right-1/4"></div>
                </div>

                {/* Floating Shapes */}
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute w-24 h-24 border border-cyan-400/40 rounded-xl top-10 left-10 rotate-45"
                ></motion.div>

                <motion.div
                    animate={{ y: [0, 25, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute w-16 h-16 border border-blue-500/40 rounded-full bottom-10 right-16"
                ></motion.div>

                {/* MAIN CONTENT */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight px-4"
                >
                    Ready to <span className="text-cyan-400">Boost Your Brand?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-gray-300 mb-10 max-w-2xl mx-auto text-base sm:text-lg px-4"
                >
                    Whether you need stunning designs, powerful marketing, or high-end development —
                    our team is here to bring your brand into the future.
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
                    {/* Button Shine Animation */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%]
      animate-[shine_2s_infinite]"></span>

                    Get in Touch
                </motion.a>

                {/* KEYFRAMES FOR SHINE */}
                <style>
                    {`
      @keyframes shine {
        0% { transform: translateX(-200%); }
        50% { transform: translateX(200%); }
        100% { transform: translateX(200%); }
      }
    `}
                </style>
            </section>


        </div>
    );
};

export default Home;
