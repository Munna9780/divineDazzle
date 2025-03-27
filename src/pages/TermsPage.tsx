import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - DivineDazzle</title>
        <meta name="description" content="Read DivineDazzle's terms and conditions to understand our policies, user agreements, and service terms." />
        <link rel="canonical" href="https://divinedazzle.com/terms" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms and Conditions</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8">Last updated: March 26, 2025</p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 mb-8">
                By accessing and using DivineDazzle, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use License</h2>
              <p className="text-gray-600 mb-8">
                Permission is granted to temporarily download one copy of the materials on DivineDazzle for personal, non-commercial transitory viewing only.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Information</h2>
              <p className="text-gray-600 mb-8">
                We strive to display our products as accurately as possible. However, actual colors and dimensions may vary slightly from what appears on your screen.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping and Returns</h2>
              <p className="text-gray-600 mb-8">
                Please refer to our shipping and returns policy for detailed information about delivery times, costs, and return procedures.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}