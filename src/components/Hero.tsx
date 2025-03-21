
import AnimatedSection from "./AnimatedSection";
import { ArrowDownCircle } from "lucide-react";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-farmer-light overflow-hidden pt-16"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-farmer-olive/5 backdrop-blur-[2px]"></div>
        <img 
          src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=2000&q=80" 
          alt="Farm landscape" 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      
      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <AnimatedSection animation="fade-in" delay={300}>
            <span className="inline-block py-1 px-3 bg-farmer-olive/10 text-farmer-olive text-sm font-medium rounded-full mb-5">
              Sustainable Farming
            </span>
          </AnimatedSection>
          
          <AnimatedSection delay={400}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-farmer-earth mb-6 leading-tight text-balance">
              Cultivating Life, <br className="hidden sm:block" />
              <span className="text-farmer-olive">Nurturing Nature</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={600}>
            <p className="text-lg md:text-xl text-farmer-earth/80 mb-8 max-w-2xl leading-relaxed text-balance">
              We grow quality, sustainable produce while fostering a deep connection with the land. Our farm embraces traditional methods alongside modern innovation.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={800}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#products" 
                className="inline-flex items-center justify-center px-6 py-3 bg-farmer-olive text-white font-medium rounded-md transition-all hover:bg-farmer-olive/90 hover:shadow-lg"
              >
                Explore Our Products
              </a>
              <a 
                href="#about" 
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-farmer-earth/20 text-farmer-earth font-medium rounded-md transition-all hover:bg-farmer-earth/5 hover:border-farmer-earth/30"
              >
                Learn More
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowDownCircle className="text-farmer-olive/70 w-10 h-10" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
