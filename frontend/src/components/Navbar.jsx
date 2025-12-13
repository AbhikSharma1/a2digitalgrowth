import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = ["Home", "About", "Services", "Portfolio", "Career", "Contact"];

  return (
    <>
      {/* Main Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-3xl border-b border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.2)]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          
          {/* Animated Logo */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to="/">
              <motion.img 
                src="https://gana.kshitizkumar.com/al.png" 
                alt="A3 Digital Growth" 
                className="h-12 w-auto drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]"
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 20px rgba(0,255,255,0.6))",
                    "drop-shadow(0 0 30px rgba(0,255,255,0.8))",
                    "drop-shadow(0 0 20px rgba(0,255,255,0.6))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="relative text-white/90 hover:text-cyan-400 transition-all duration-300 text-sm uppercase tracking-wider font-medium group"
                >
                  {link}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    initial={false}
                    whileHover={{ scale: 1.1 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Login Buttons */}
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/employee"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 text-sm"
                >
                  Employee
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 text-sm"
                >
                  Admin
                </Link>
              </motion.div>
            </div>

            {/* Awesome CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200 }}
              whileHover={{ 
                scale: 1.08,
                y: -3,
                rotateY: 5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.92, rotateY: -5 }}
              className="relative"
            >
              <Link
                to="/contact"
                className="relative block px-8 py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-2xl font-bold text-lg overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(0,0,0,0.9)] transition-all duration-500 border border-gray-700"
              >
                {/* Animated Background Layers */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-gray-800"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #000000, #1f2937, #374151, #111827)",
                      "linear-gradient(135deg, #374151, #111827, #000000, #1f2937)",
                      "linear-gradient(225deg, #111827, #000000, #1f2937, #374151)",
                      "linear-gradient(315deg, #1f2937, #374151, #111827, #000000)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                />
                
                {/* Particle Effects */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gray-400 rounded-full"
                      animate={{
                        x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1.5, 0]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                {/* Button Content */}
                <span className="relative flex items-center justify-center gap-3 z-10">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Sparkles size={20} className="drop-shadow-lg" />
                  </motion.div>
                  
                  <motion.span
                    className="font-extrabold tracking-wide"
                    animate={{ 
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(156,163,175,0.6)",
                        "0 0 10px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    GET QUOTE
                  </motion.span>
                  
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-xl"
                  >
                    🚀
                  </motion.div>
                </span>
                
                {/* Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  animate={{
                    borderColor: [
                      "rgba(75,85,99,0.5)",
                      "rgba(107,114,128,0.5)",
                      "rgba(156,163,175,0.5)",
                      "rgba(75,85,99,0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </Link>
            </motion.div>
          </nav>

          {/* Animated Mobile Menu Button */}
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-3 text-cyan-400 hover:text-cyan-300 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
          >
            <motion.div
              animate={{ rotate: sidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      {/* Animated Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900 via-black to-gray-900 z-50 border-r border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.3)]"
            >
              <div className="p-6">
                {/* Header */}
                <motion.div 
                  className="flex justify-between items-center mb-8"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.img 
                    src="https://gana.kshitizkumar.com/al.png" 
                    alt="A3 Digital Growth" 
                    className="h-10 w-auto drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]"
                    animate={{ 
                      filter: [
                        "drop-shadow(0 0 15px rgba(0,255,255,0.6))",
                        "drop-shadow(0 0 25px rgba(0,255,255,0.8))",
                        "drop-shadow(0 0 15px rgba(0,255,255,0.6))"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </motion.div>
                
                {/* Navigation Links */}
                <nav className="space-y-3">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300 }}
                      whileHover={{ 
                        x: 10, 
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                    >
                      <Link
                        to={`/${link.toLowerCase()}`}
                        onClick={() => setSidebarOpen(false)}
                        className="block w-full text-left px-4 py-4 text-white/90 hover:text-cyan-400 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 border-l-4 border-transparent hover:border-cyan-400 font-medium"
                      >
                        {link}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                {/* Login Buttons */}
                <div className="space-y-3 mt-6">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <Link
                      to="/employee"
                      onClick={() => setSidebarOpen(false)}
                      className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg font-medium transition-all duration-300"
                    >
                      Employee Login
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.75, type: "spring", stiffness: 300 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <Link
                      to="/admin"
                      onClick={() => setSidebarOpen(false)}
                      className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg font-medium transition-all duration-300"
                    >
                      Admin Login
                    </Link>
                  </motion.div>
                </div>

                {/* Awesome Mobile CTA Button */}
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    to="/contact"
                    onClick={() => setSidebarOpen(false)}
                    className="relative block w-full mt-8 px-6 py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white text-center rounded-2xl font-bold overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(0,0,0,0.9)] transition-all duration-500 border border-gray-700"
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-gray-800"
                      animate={{
                        background: [
                          "linear-gradient(45deg, #000000, #1f2937, #374151)",
                          "linear-gradient(135deg, #374151, #111827, #000000)",
                          "linear-gradient(225deg, #111827, #000000, #1f2937)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    
                    <span className="relative flex items-center justify-center gap-3 z-10">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles size={18} />
                      </motion.div>
                      
                      <motion.span
                        className="font-extrabold tracking-wide"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(255,255,255,0.3)",
                            "0 0 20px rgba(156,163,175,0.6)",
                            "0 0 10px rgba(255,255,255,0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        GET QUOTE
                      </motion.span>
                      
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🚀
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div 
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div 
                    className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                  <motion.p 
                    className="text-center text-gray-500 text-sm mt-4"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    A3 Digital Growth
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
