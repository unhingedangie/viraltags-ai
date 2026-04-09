'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-smooth">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center font-bold text-gray-950 glow-neon-green">
                #
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gradient-neon">
                ViralTags
              </h1>
              <p className="text-xs text-gray-400">AI Caption & Hashtag</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className="text-sm font-medium text-gray-300 hover:text-white transition-smooth"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-300 hover:text-white transition-smooth"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-gray-300 hover:text-white transition-smooth"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-300 hover:text-white transition-smooth"
            >
              Blog
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => alert("Sign in coming soon! We're setting up accounts.")}
              className="text-sm font-semibold text-gray-300 hover:text-white transition-smooth"
            >
              Sign In
            </button>
            <Link href="/pricing" className="btn-neon-primary text-sm">Get Started</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 hover:opacity-80 transition-smooth"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4 space-y-3 animate-slide-up">
            <Link
              href="/features"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-gray-300 hover:text-white transition-smooth"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-gray-300 hover:text-white transition-smooth"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-gray-300 hover:text-white transition-smooth"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-gray-300 hover:text-white transition-smooth"
            >
              Blog
            </Link>
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-800">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  alert("Sign in coming soon! We're setting up accounts.");
                }}
                className="text-sm font-semibold text-gray-300 w-full text-left"
              >
                Sign In
              </button>
              <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="btn-neon-primary w-full text-sm block text-center">
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
