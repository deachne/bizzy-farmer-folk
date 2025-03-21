
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-farmer-earth text-white py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Bizzy Farmer</h3>
            <p className="text-white/80 max-w-md mb-6">
              Committed to sustainable farming practices that honor the land and produce exceptional food for our community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Products', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Subscribe</h4>
            <p className="text-white/70 mb-4">
              Join our newsletter for updates and seasonal offerings.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md bg-white/10 text-white border-0 focus:outline-none focus:ring-2 focus:ring-farmer-clay"
              />
              <button 
                type="submit" 
                className="bg-farmer-clay text-white px-4 py-2 rounded-r-md hover:bg-farmer-clay/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-white/60 flex flex-col md:flex-row justify-between">
          <p>© {new Date().getFullYear()} Bizzy Farmer. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
