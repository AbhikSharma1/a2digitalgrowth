import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Smile } from 'lucide-react';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Aastik 🚀 Your AI assistant at A3 Digital Growth! How can I help you today?", sender: 'bot' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Hide chatbot on admin and employee panels
    const currentPath = window.location.pathname;
    const shouldHideChatbot = currentPath === '/admin' || currentPath === '/employee';

    if (shouldHideChatbot) {
        return null;
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const navigateToPage = (path) => {
        setTimeout(() => {
            window.location.href = path;
        }, 2000);
    };

    const getSmartResponse = (input) => {
        const lowerInput = input.toLowerCase();
        
        // Greeting responses
        if (lowerInput.match(/\b(hi|hello|hey|good morning|good afternoon|good evening|What's up)\b/)) {
            return "Hello! I'm Aastik, your AI assistant at A3 Digital Growth! 👋 I'm here to help you with our services, pricing, portfolio, and more. What would you like to know?";
        }
        
        // Developer information
        if (lowerInput.match(/\b(developer|abhik|sharma|who made|who created|who built|who developed|creator|maker)\b/)) {
            return "🧑‍💻 This website was developed by Abhik Sharma! 👨‍💻\n\n• Full Stack Developer at A3 Digital Growth \n• Student at LNCT Group of Colleges, Bhopal\n• Specializes in MERN Stack Development\n• Passionate about creating innovative digital solutions\n\nAbhik combines his academic knowledge with practical industry experience to build cutting-edge web applications!";
        }

        //Founder information
        if (lowerInput.match(/\b(founder|owner|who runs|who leads|who is in charge|about a3|about a3 digital growth)\b/)) {
            return "👨‍💼 A3 Digital Growth 🚀 was founded by Abhiyuddh Kumar!\n\n• Visionary Entrepreneur and Digital Strategist\n• Committed to driving business growth through innovative digital solutions\n• Leads a talented team of developers, designers, editors and marketers\n• Passionate about helping businesses succeed in the digital age\n\nUnder Abhiyuddh's leadership, A3 Digital Growth has become a trusted partner for clients seeking top-notch Software Development, SEO, and Digital Marketing services!";
        }
        
        // College/Education information
        if (lowerInput.match(/\b(lnct|college|education|student|bhopal|study)\b/)) {
            return "🎓 About Abhik's Education:\n\n• Currently studying at LNCT Group of Colleges, Bhopal\n• One of the premier engineering institutions in Madhya Pradesh\n• Gaining hands-on experience while pursuing academics\n• Applying theoretical knowledge to real-world projects at A3 Digital Growth\n\nA perfect blend of academic excellence and industry experience!";
        }
        
        // Services related
        if (lowerInput.match(/\b(service|services|what do you do|offerings)\b/)) {
            navigateToPage('/services');
            return "🚀 A3 Digital Growth offers:\n\n• Web Development (MERN Stack)\n• SEO & Digital Marketing\n• Graphics & UI/UX Design\n• AI Automation Solutions\n• E-commerce Development\n\n✨ Redirecting you to our Services page in 2 seconds...";
        }
        
        // Web development
        if (lowerInput.match(/\b(web development|website|mern|react|node|mongodb)\b/)) {
            return "💻 Our web development expertise includes:\n\n• MERN Stack (MongoDB, Express, React, Node.js)\n• Responsive & Mobile-First Design\n• E-commerce Solutions\n• Custom Web Applications\n• API Development\n\nWould you like to discuss your project requirements?";
        }
        
        // SEO and Marketing
        if (lowerInput.match(/\b(seo|marketing|digital marketing|google|ranking)\b/)) {
            return "📈 Our SEO & Digital Marketing services:\n\n• Search Engine Optimization\n• Google Ads & PPC Campaigns\n• Social Media Marketing\n• Content Marketing\n• Analytics & Reporting\n\nLet's boost your online presence!";
        }
        
        // Design services
        if (lowerInput.match(/\b(design|graphics|ui|ux|logo|branding)\b/)) {
            return "🎨 Our design services include:\n\n• UI/UX Design\n• Logo & Brand Identity\n• Graphics Design\n• Website Design\n• Marketing Materials\n\nNeed help with your brand's visual identity?";
        }
        
        // Pricing
        if (lowerInput.match(/\b(price|pricing|cost|budget|quote|how much)\b/)) {
            return "💰 Our pricing is project-based and depends on:\n\n• Project complexity\n• Timeline requirements\n• Features needed\n• Ongoing support\n\nContact us for a FREE consultation and custom quote! Would you like me to connect you with our team?";
        }
        
        // Portfolio
        if (lowerInput.match(/\b(portfolio|work|projects|examples|previous work)\b/)) {
            navigateToPage('/portfolio');
            return "🏆 Check out our amazing portfolio showcasing:\n\n• E-commerce Websites\n• Business Applications\n• Marketing Campaigns\n• Brand Designs\n\n✨ Redirecting you to our Portfolio page in 2 seconds...";
        }
        
        // Contact information
        if (lowerInput.match(/\b(contact|phone|email|address|reach|call)\b/)) {
            navigateToPage('/contact');
            return "📞 Get in touch with A3 Digital Growth:\n\n• Visit our Contact page\n• Fill out our contact form\n• Request a free consultation\n• Get instant quote\n\n✨ Redirecting you to our Contact page in 2 seconds...";
        }
        
        // Career opportunities
        if (lowerInput.match(/\b(career|job|hiring|work|opportunity|join)\b/)) {
            navigateToPage('/career');
            return "🚀 Join the A3 Digital Growth team!\n\n• Web Developers\n• Digital Marketers\n• Designers\n• Content Writers\n\n✨ Redirecting you to our Career page in 2 seconds...";
        }
        
        // AI and automation
        if (lowerInput.match(/\b(ai|artificial intelligence|automation|chatbot|machine learning)\b/)) {
            return "🤖 Our AI & Automation solutions:\n\n• Custom Chatbots\n• Process Automation\n• AI-powered Analytics\n• Smart Recommendations\n• Workflow Optimization\n\nLet's automate your business processes!";
        }
        
        // Help and support
        if (lowerInput.match(/\b(help|support|assist|guide)\b/)) {
            return "🆘 I can help you with:\n\n• Service information\n• Pricing details\n• Portfolio examples\n• Contact information\n• Career opportunities\n• Technical questions\n\nWhat specific information do you need?";
        }

        //About clients
        if (lowerInput.match(/\b(clients|customers|who do you work with|clientele|partners)\b/)) {
            return "🤝 Our valued clients include:\n\n• Startups looking to establish their digital presence\n• Small & Medium Businesses aiming for growth\n• E-commerce ventures seeking robust platforms\n• Entrepreneurs wanting innovative solutions\n\nOur major clients are : \n\nNityaMakeOver\n\nThe TechIndia\n\nMaa Ambey Masale\n\nWe pride ourselves on delivering tailored digital solutions that drive success for our diverse clientele!";
        }
        
        //Conversational & Curiosity Questions
        if (lowerInput.match(/\b(how are you|what can you do|tell me about yourself|who are you|what is your purpose|How old are you|are you a robot)\b/)) {
            return "😊 I'm Aastik, your friendly AI assistant at A3 Digital Growth! I'm here to help you with information about our services, pricing, portfolio, and more. Just ask me anything related to A3 Digital Growth!";
        }

        // Farewell responses
        if (lowerInput.match(/\b(bye|goodbye|see you|talk later|farewell)\b/)) {
            return "Goodbye! 👋 If you have any more questions, feel free to reach out anytime. Have a great day!";
        }

        // Thank you responses
        if (lowerInput.match(/\b(thank you|thanks|appreciate it|grateful)\b/)) {
            return "You're welcome! 😊 I'm here to help whenever you need assistance. Just ask!";
        }

        // Feedback responses
        if (lowerInput.match(/\b(feedback|suggestion|improve|like|dislike)\b/)) {
            return "Thank you for your feedback! 🙏 We appreciate your input and are always looking to improve our services. If you have specific suggestions, feel free to share them!";
        }

        // Small Talk/Emotions 
        if (lowerInput.match(/\b(love|hate|happy|sad|excited|bored|angry)\b/)) {
            return "I understand! 😊 but I'm a helping AI assistant and I don't have the feelings or emotions to ellaborate. At A3 Digital Growth, we're passionate about helping our clients succeed. If you're feeling excited about a project or need assistance, just let me know!";
        }

        // Default response
        return "I'm here to help! 😊 Ask me about:\n\n• Our services (Web Dev, SEO, Design, AI)\n• Pricing and quotes\n• Portfolio and past work\n• Career opportunities\n• Contact information\n• Developer info (Abhik Sharma)\n\nWhat would you like to know more about?";
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user'
        };

        setMessages(prev => [...prev, newMessage]);
        setIsTyping(true);

        // Generate smart bot response
        setTimeout(() => {
            const response = getSmartResponse(inputMessage);

            const botMessage = {
                id: Date.now() + 1,
                text: response,
                sender: 'bot'
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);

        setInputMessage('');
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 bg-gray-800 border border-gray-700 text-gray-300 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <motion.div
                    animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Bot size={24} />
                </motion.div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Smile size={20} className="text-yellow-300" />
                                </motion.div>
                                <span className="font-semibold text-gray-200">Aastik AI</span>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-gray-700 p-1 rounded text-gray-300"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-xs p-3 rounded-lg whitespace-pre-line ${
                                        message.sender === 'user' 
                                            ? 'bg-gray-700 text-gray-100' 
                                            : 'bg-gray-800 text-gray-200 border border-gray-600'
                                    }`}>
                                        {message.text}
                                    </div>
                                </motion.div>
                            ))}
                            
                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gray-800 text-gray-200 p-3 rounded-lg border border-gray-600">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 text-sm focus:outline-none focus:border-gray-500 placeholder-gray-500"
                                />
                                <motion.button
                                    onClick={handleSendMessage}
                                    disabled={isTyping}
                                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 disabled:opacity-50 text-gray-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send size={16} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;