import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About DivineDazzle - Our Story and Mission</title>
        <meta name="description" content="Learn about DivineDazzle's mission to transform spaces with stunning wall art. Discover our story, values, and commitment to quality." />
        <link rel="canonical" href="https://divinedazzle.com/about" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">About DivineDazzle</h1>
            
            <div className="prose max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                Welcome to DivineDazzle, where we believe that every wall tells a story. Our mission is to help you transform your living spaces into personalized galleries that reflect your unique style and personality.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-8">
                Founded in 2025, DivineDazzle emerged from a passion for combining art with interior design. We understand that finding the perfect piece of wall art can be transformative, turning any room into a space that truly feels like home.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-8">
                We're dedicated to curating exceptional wall art that not only enhances your space but also creates meaningful connections between artists and art lovers. Our platform makes it easy to discover, visualize, and acquire pieces that speak to you.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quality Commitment</h2>
              <p className="text-gray-600 mb-8">
                Every piece in our collection is carefully selected for its artistic merit, quality, and ability to transform spaces. We work with trusted suppliers to ensure that each artwork meets our high standards for materials and craftsmanship.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}