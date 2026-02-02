'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🚌</span>
              <span className="font-bold text-xl text-amber-600">Bizzy B's Tumblebus</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-amber-600 font-medium">About</a>
              <a href="#services" className="text-gray-600 hover:text-amber-600 font-medium">Services</a>
              <a href="#equipment" className="text-gray-600 hover:text-amber-600 font-medium">Equipment</a>
              <a href="#contact" className="text-gray-600 hover:text-amber-600 font-medium">Contact</a>
              <Link href="/enroll" className="btn-primary text-sm py-2 px-6">
                Enroll Now!
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#about" className="text-gray-600 hover:text-amber-600 font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="#services" className="text-gray-600 hover:text-amber-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Services</a>
                <a href="#equipment" className="text-gray-600 hover:text-amber-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Equipment</a>
                <a href="#contact" className="text-gray-600 hover:text-amber-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                <Link href="/enroll" className="btn-primary text-center">Enroll Now!</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block bg-amber-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                🎉 Now Booking for 2026!
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                We Bring the <span className="text-amber-600">GYM</span> to <span className="text-blue-600">YOU!</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                The Tumblebus is a full-sized school bus converted into a safe, fun, child-sized gym! 
                Perfect for daycares, schools, birthday parties & special events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/enroll" className="btn-primary">
                  🎈 Enroll Now
                </Link>
                <a href="#services" className="btn-outline">
                  Learn More
                </a>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-8 text-center">
                    <div className="text-8xl mb-4 animate-bounce-slow">🚌</div>
                    <div className="text-6xl mb-2">🤸‍♀️ 🤸 🤸‍♂️</div>
                    <p className="text-amber-800 font-bold text-lg">Tumbling Fun on Wheels!</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-pink-500 text-white rounded-full p-3 shadow-lg animate-bounce">
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-full p-3 shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to the <span className="text-amber-600">TUMBLEBUS!</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're excited that you've decided to tumble through and learn about us! 
              We have a unique and fun way to keep your little ones happy and fit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">🏫</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Daycares & Schools</h3>
              <p className="text-gray-600">
                We bring physical education right to your facility! 
                Kids get exercise without leaving the premises.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">🎂</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Birthday Parties</h3>
              <p className="text-gray-600">
                Make your child's birthday unforgettable with our 
                mobile gym party experience!
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">🎪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Special Events</h3>
              <p className="text-gray-600">
                Festivals, community events, church gatherings - 
                we add fun to any occasion!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 gradient-fun">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600">Choose the perfect program for your little ones!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-amber-500 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">📚 Weekly Programs</h3>
                <p>Perfect for daycares and schools</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Weekly visits to your location</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Age-appropriate classes (2-10 years)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Certified instructors</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Progress tracking</span>
                  </li>
                </ul>
                <Link href="/enroll" className="btn-primary w-full mt-6 block text-center">
                  Enroll Your Facility
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-pink-500 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">🎈 Party Packages</h3>
                <p>Make birthdays unforgettable!</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>1-2 hour party sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Up to 15 kids per party</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Party games & activities</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>We come to you!</span>
                  </li>
                </ul>
                <Link href="/enroll" className="btn-secondary w-full mt-6 block text-center">
                  Book a Party
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section id="equipment" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inside the <span className="text-amber-600">Tumblebus</span>
            </h2>
            <p className="text-xl text-gray-600">Our bus is packed with exciting equipment!</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: '🦎', name: 'Monkey Bars' },
              { emoji: '🎪', name: 'Trampoline' },
              { emoji: '🤸', name: 'Tumbling Mats' },
              { emoji: '⚖️', name: 'Balance Beam' },
              { emoji: '🏋️', name: 'Vault' },
              { emoji: '🛝', name: 'Zip Line' },
              { emoji: '⭕', name: 'Rings' },
              { emoji: '🛝', name: 'Slide' },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">{item.emoji}</div>
                <p className="font-bold text-gray-800">{item.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Safety First! 🛡️</h3>
            <p className="text-lg opacity-90">
              All equipment is child-sized and safety-tested. Our certified instructors 
              supervise all activities. The bus is climate-controlled for year-round comfort!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Parents <span className="text-pink-500">Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                text: 'My kids LOVE Tumblebus day! They talk about it all week. Best decision we made for their daycare!',
                rating: 5
              },
              {
                name: 'Jennifer T.',
                text: 'We had the Tumblebus for my daughter\'s 5th birthday. The kids had a blast and the staff was amazing!',
                rating: 5
              },
              {
                name: 'Amanda R.',
                text: 'Professional, fun, and the kids get great exercise. Highly recommend for any school or daycare!',
                rating: 5
              }
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-amber-400 text-xl mb-3">
                  {'⭐'.repeat(review.rating)}
                </div>
                <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                <p className="font-bold text-gray-900">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Let's <span className="text-amber-600">Connect!</span>
            </h2>
            <p className="text-xl text-gray-600">
              Ready to bring the fun to your little ones? Get in touch!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Phone</p>
                  <a href="tel:+15551234567" className="text-amber-600 hover:underline">(555) 123-4567</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Email</p>
                  <a href="mailto:info@bizzybtumblebus.com" className="text-amber-600 hover:underline">info@bizzybtumblebus.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Service Area</p>
                  <p className="text-gray-600">Greater Metro Area & Surrounding Counties</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                  <span>f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700">
                  <span>📷</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="input-field" />
                <input type="email" placeholder="Your Email" className="input-field" />
                <input type="tel" placeholder="Phone Number" className="input-field" />
                <textarea placeholder="How can we help?" rows={3} className="input-field" />
                <button type="submit" className="btn-primary w-full">
                  Send Message 🚌
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Buzz the Fun to Your Little Ones? 🐝
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Enroll today and give your kids the gift of fitness and fun!
          </p>
          <Link href="/enroll" className="inline-block bg-white text-amber-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
            Start Enrollment →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🚌</span>
                <span className="font-bold text-xl">Bizzy B's</span>
              </div>
              <p className="text-gray-400">
                Bringing fitness and fun to your children since 2015.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-amber-400">About Us</a></li>
                <li><a href="#services" className="hover:text-amber-400">Services</a></li>
                <li><a href="#equipment" className="hover:text-amber-400">Equipment</a></li>
                <li><a href="#contact" className="hover:text-amber-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/enroll" className="hover:text-amber-400">Enroll Now</Link></li>
                <li><a href="#" className="hover:text-amber-400">Weekly Programs</a></li>
                <li><a href="#" className="hover:text-amber-400">Birthday Parties</a></li>
                <li><a href="#" className="hover:text-amber-400">Special Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 (555) 123-4567</li>
                <li>📧 info@bizzybtumblebus.com</li>
                <li>🕐 Mon-Sat: 8am-6pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 Bizzy B's Tumblebus. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/admin" className="text-gray-500 hover:text-gray-400 text-sm">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
