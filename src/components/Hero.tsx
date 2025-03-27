import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-24 flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80"
          alt="Elegant living room with wall art"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Transform Your Space with Stunning Wall Art
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Discover curated pieces that elevate your interior design and reflect your unique style.
          </p>
          <div className="flex space-x-4">
            <a
              href="#gallery"
              className="group inline-flex items-center px-8 py-4 bg-[#3498DB] text-white rounded-lg hover:bg-[#2980B9] transition-all duration-300 transform hover:translate-x-1"
            >
              Explore Gallery
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}