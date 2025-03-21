
import { useState } from 'react';
import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: 'Organic Vegetables',
    description: 'Fresh, seasonal vegetables grown without synthetic pesticides or fertilizers.',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=600&q=80',
    category: 'produce'
  },
  {
    id: 2,
    name: 'Heritage Grains',
    description: 'Traditional grain varieties cultivated using sustainable farming practices.',
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&q=80',
    category: 'grains'
  },
  {
    id: 3,
    name: 'Pasture-Raised Livestock',
    description: 'Ethically raised animals with access to open pasture and natural diets.',
    image: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=crop&w=600&q=80',
    category: 'livestock'
  },
  {
    id: 4,
    name: 'Artisanal Dairy',
    description: 'Small-batch dairy products made from milk produced on our farm.',
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&q=80',
    category: 'dairy'
  },
  {
    id: 5,
    name: 'Seasonal Fruit',
    description: 'Tree-ripened fruits harvested at peak flavor and nutritional value.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80',
    category: 'produce'
  }
];

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Produce', value: 'produce' },
  { label: 'Livestock', value: 'livestock' },
  { label: 'Grains', value: 'grains' },
  { label: 'Dairy', value: 'dairy' }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <section id="products" className="bg-farmer-beige section-spacing">
      <div className="container-wide">
        <AnimatedSection>
          <span className="inline-block py-1 px-3 bg-farmer-olive/10 text-farmer-olive text-sm font-medium rounded-full mb-5">
            Our Products
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-farmer-earth mb-6 max-w-xl text-balance">
            From Our Farm to Your Table
          </h2>
          <p className="text-lg text-farmer-earth/80 mb-12 max-w-2xl text-balance">
            We take pride in every product we grow, focusing on quality, sustainability, and exceptional flavor.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category.value
                    ? "bg-farmer-olive text-white" 
                    : "bg-white/50 text-farmer-earth/70 hover:bg-white hover:text-farmer-earth"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <AnimatedSection 
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm card-hover"
              delay={index * 100}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-farmer-earth mb-2">
                  {product.name}
                </h3>
                <p className="text-farmer-earth/70">
                  {product.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
