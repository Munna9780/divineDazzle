import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - DivineDazzle</title>
        <meta name="description" content="Read DivineDazzle's privacy policy to understand how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://divinedazzle.com/privacy" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8">Last updated: March 26, 2025</p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-8">
                We collect information that you provide directly to us, including when you create an account, make a purchase, or contact us for support. This may include your name, email address, and payment information.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-8">
                We use the information we collect to provide and improve our services, process your transactions, communicate with you, and ensure the security of your account.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
              <p className="text-gray-600 mb-8">
                We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security</h2>
              <p className="text-gray-600 mb-8">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}