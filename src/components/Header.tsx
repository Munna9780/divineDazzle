import React, { useState, useEffect } from 'react';
import { Menu, X, Paintbrush } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Paintbrush className="h-8 w-8 text-[#3498DB] transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-2xl font-semibold bg-gradient-to-r from-[#2C3E50] to-[#3498DB] bg-clip-text text-transparent">
              DivineDazzle
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/about" className="nav-link">About</Link>
            <a href="#gallery" className="nav-link">Gallery</a>
            <Link to="/admin" className="px-4 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#2980B9] transition-colors">
              Admin
            </Link>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/about" className="nav-link">About</Link>
              <a href="#gallery" className="nav-link">Gallery</a>
              <Link to="/admin" className="px-4 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#2980B9] transition-colors text-center">
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}