
import AnimatedSection from "./AnimatedSection";

const About = () => {
  return (
    <section id="about" className="bg-white section-spacing">
      <div className="container-wide">
        <AnimatedSection>
          <span className="inline-block py-1 px-3 bg-farmer-olive/10 text-farmer-olive text-sm font-medium rounded-full mb-5">
            Our Story
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-farmer-earth mb-16 max-w-xl text-balance">
            Rooted in Tradition, Growing with Innovation
          </h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800&q=80" 
                alt="Farmer with livestock" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-in-right">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-farmer-earth/80 text-balance">
                Bizzy Farmer began in 1978 with a simple belief: that farming should work in harmony with nature. Founded by the Williams family, our farm spans 120 acres of fertile land, carefully tended through regenerative agriculture practices.
              </p>
              <p className="text-lg leading-relaxed text-farmer-earth/80 text-balance">
                For over four decades, we've been committed to sustainable methods that produce exceptional crops while nurturing the ecosystem. Our approach combines time-tested wisdom with modern innovation, allowing us to grow premium produce while preserving the land for future generations.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <p className="text-4xl font-bold text-farmer-olive mb-2">120+</p>
                  <p className="text-farmer-earth/70">Acres of farmland</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-farmer-olive mb-2">45</p>
                  <p className="text-farmer-earth/70">Years of experience</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-farmer-olive mb-2">12</p>
                  <p className="text-farmer-earth/70">Crop varieties</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-farmer-olive mb-2">100%</p>
                  <p className="text-farmer-earth/70">Sustainable methods</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
