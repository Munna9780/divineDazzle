import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>DivineDazzle - Transform Your Space with Stunning Wall Art</title>
        <meta name="description" content="Discover unique wall art pieces that elevate your interior design. Upload, visualize, and bring your vision to life with DivineDazzle." />
        <meta name="keywords" content="wall art, interior design, home decor, art prints, custom artwork" />
        <link rel="canonical" href="https://divinedazzle.com" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="gallery">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Featured Collection</h2>
              <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                Discover our carefully curated selection of stunning wall art pieces that will transform your space.
              </p>
              <ProductGrid />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}