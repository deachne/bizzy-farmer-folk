
import AnimatedSection from "./AnimatedSection";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="bg-white section-spacing">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <AnimatedSection>
            <span className="inline-block py-1 px-3 bg-farmer-olive/10 text-farmer-olive text-sm font-medium rounded-full mb-5">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-farmer-earth mb-6 text-balance">
              Visit Our Farm
            </h2>
            <p className="text-lg text-farmer-earth/80 mb-10 max-w-lg text-balance">
              We welcome visitors to experience our farm firsthand. Stop by our farm store, join a tour, or contact us for partnerships and wholesale inquiries.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-farmer-sage/20 p-3 rounded-full text-farmer-olive">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-farmer-earth mb-1">Location</h4>
                  <p className="text-farmer-earth/70">123 Rural Route, Farmville, CA 95123</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-farmer-sage/20 p-3 rounded-full text-farmer-olive">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-farmer-earth mb-1">Phone</h4>
                  <p className="text-farmer-earth/70">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-farmer-sage/20 p-3 rounded-full text-farmer-olive">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-farmer-earth mb-1">Email</h4>
                  <p className="text-farmer-earth/70">hello@bizzyfarmer.com</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-farmer-earth mb-4">Farm Store Hours</h3>
              <div className="space-y-2 text-farmer-earth/70">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-in-right" delay={300}>
            <div className="bg-farmer-light rounded-xl overflow-hidden h-full">
              <img 
                src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&q=80" 
                alt="Farm landscape" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
