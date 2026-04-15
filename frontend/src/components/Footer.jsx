import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

        {/* Brand Section */}
        <div>
          <a href="/" className="block mb-4">
            <img 
              src="https://gana.kshitizkumar.com/al.png" 
              alt="A3 Digital Growth" 
              className="h-16 w-auto"
            />
          </a>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            Your trusted partner for advertisement, SEO, branding, designing, development & digital growth.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4 mt-6 flex-wrap">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300">
            {["Home", "About", "Services", "Portfolio", "Career", "Contact"].map((link, i) => (
              <li key={i}>
                <a
                  href={`/${link.toLowerCase()}`}
                  className="hover:text-cyan-400 transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-3 text-gray-300">
            {[
              "Advertisement",
              "SEO & Marketing",
              "Graphics Designing",
              "Video Editing",
              "Web Development",
              "Software Development",
            ].map((service, i) => (
              <li key={i}>
                <a href="/services" className="hover:text-cyan-400 transition">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

          <div className="flex items-start gap-3 mb-4 text-gray-300">
            <Mail size={18} className="mt-1" />
            <span>a3digitalgrowth@gmail.com</span>
          </div>

          <div className="flex items-start gap-3 mb-4 text-gray-300">
            <Phone size={18} className="mt-1" />
            <span>+91 7050384263</span>
          </div>

          <div className="flex items-start gap-3 text-gray-300">
            <MapPin size={18} className="mt-1" />
            <span>Dhanbad, Jharkhand, IN</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} A3 Digital Growth — All Rights Reserved. | Developed by <a href="https://abhik.kshitizproducts.cloud/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition">Abhik@1623</a>
      </div>
    </footer>
  );
};

export default Footer;
